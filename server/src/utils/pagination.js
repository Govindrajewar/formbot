const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

const parsePagination = (query) => {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || DEFAULT_LIMIT, 1), MAX_LIMIT);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

const buildPaginatedResponse = (data, total, page, limit) => ({
  data,
  page,
  limit,
  total,
  totalPages: Math.max(Math.ceil(total / limit), 1),
});

module.exports = { parsePagination, buildPaginatedResponse };
