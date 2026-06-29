import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileSpreadsheet, FileText } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axiosInstance from "../api/axiosInstance";
import NavBar from "../components/HomePage/NavBar";
import Footer from "../components/HomePage/Footer";
import "../style/Responses/Responses.css";

const EXPORT_PAGE_LIMIT = 100;

const buildExportTable = (responses) => {
  const columns = [];
  const seenItemIds = new Set();

  responses.forEach((response) => {
    response.answers.forEach((answer) => {
      if (!seenItemIds.has(answer.itemId)) {
        seenItemIds.add(answer.itemId);
        columns.push({ itemId: answer.itemId, label: answer.type });
      }
    });
  });

  const headers = ["Submitted At", ...columns.map((column) => column.label)];
  const rows = responses.map((response) => {
    const answerByItemId = new Map(
      response.answers.map((answer) => [answer.itemId, answer.value])
    );
    return [
      new Date(response.createdAt).toLocaleString(),
      ...columns.map((column) => answerByItemId.get(column.itemId) ?? ""),
    ];
  });

  return { headers, rows };
};

const escapeCsvCell = (cell) => `"${String(cell).replace(/"/g, '""')}"`;

const downloadBlob = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

function Responses() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [formName, setFormName] = useState("");
  const [responses, setResponses] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/formdata/${formId}`)
      .then((response) => setFormName(response.data.formName))
      .catch(() => setLoadError("Could not load this form"));
  }, [formId]);

  const loadResponses = (pageToLoad) => {
    axiosInstance
      .get(`/formdata/${formId}/responses?page=${pageToLoad}`)
      .then((res) => {
        setResponses((prev) =>
          pageToLoad === 1 ? res.data.data : [...prev, ...res.data.data]
        );
        setPage(res.data.page);
        setHasMore(res.data.page < res.data.totalPages);
      })
      .catch((error) => {
        console.error("There was an error fetching responses!", error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadResponses(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId]);

  const fetchAllResponsesForExport = async () => {
    let allResponses = [];
    let currentPage = 1;
    let totalPages = 1;

    do {
      const res = await axiosInstance.get(
        `/formdata/${formId}/responses?page=${currentPage}&limit=${EXPORT_PAGE_LIMIT}`
      );
      allResponses = [...allResponses, ...res.data.data];
      totalPages = res.data.totalPages;
      currentPage += 1;
    } while (currentPage <= totalPages);

    return allResponses;
  };

  const handleExport = async (format) => {
    setExportError("");
    setIsExporting(true);
    try {
      const allResponses = await fetchAllResponsesForExport();
      const { headers, rows } = buildExportTable(allResponses);
      const baseFilename = (formName || "responses").replace(/[^a-z0-9_-]+/gi, "_");

      if (format === "csv") {
        const csvContent = [headers, ...rows]
          .map((row) => row.map(escapeCsvCell).join(","))
          .join("\r\n");
        downloadBlob(`${csvContent}\r\n`, `${baseFilename}_responses.csv`, "text/csv;charset=utf-8;");
      } else {
        const doc = new jsPDF({ orientation: rows.length && headers.length > 4 ? "landscape" : "portrait" });
        doc.text(`${formName || "Form"} responses`, 14, 14);
        autoTable(doc, {
          head: [headers],
          body: rows,
          startY: 20,
          styles: { fontSize: 8 },
        });
        doc.save(`${baseFilename}_responses.pdf`);
      }
    } catch (error) {
      console.error("There was an error exporting responses!", error);
      setExportError("Could not export responses. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="responses-page">
      <NavBar centerText={formName ? `Responses - ${formName}` : "Responses"} />

      <div className="responses-main">
        <button className="responses-back" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={16} />
          Back to dashboard
        </button>

        <div className="responses-header-row">
          <h1 className="responses-title">{formName || "Form"} responses</h1>

          {!loadError && !isLoading && responses.length > 0 && (
            <div className="responses-export-actions">
              <button
                className="responses-export-btn"
                onClick={() => handleExport("csv")}
                disabled={isExporting}
              >
                <FileSpreadsheet size={16} />
                Save as Excel
              </button>
              <button
                className="responses-export-btn"
                onClick={() => handleExport("pdf")}
                disabled={isExporting}
              >
                <FileText size={16} />
                Save as PDF
              </button>
            </div>
          )}
        </div>

        {exportError && <div className="responses-status-message">{exportError}</div>}

        {loadError ? (
          <div className="responses-status-message">{loadError}</div>
        ) : isLoading ? (
          <div className="responses-status-message">Loading responses...</div>
        ) : responses.length === 0 ? (
          <div className="responses-status-message">No responses collected yet.</div>
        ) : (
          <div className="responses-list">
            {responses.map((response) => (
              <div className="response-item" key={response._id}>
                <div className="response-item-date">
                  {new Date(response.createdAt).toLocaleString()}
                </div>
                {response.answers.map((answer) => (
                  <div className="response-answer" key={answer.itemId}>
                    <span className="response-answer-type">{answer.type}:</span>{" "}
                    {answer.value}
                  </div>
                ))}
              </div>
            ))}
            {hasMore && (
              <div className="load-more-responses" onClick={() => loadResponses(page + 1)}>
                Load more
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Responses;
