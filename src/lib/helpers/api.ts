export function jsonResponse(data: object) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export function errorResponse(code: number, message: string) {
  return new Response(JSON.stringify({ message, code }), {
    status: code,
    headers: {
      "content-type": "text/plain",
    },
  });
}
