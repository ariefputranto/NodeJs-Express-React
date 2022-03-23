const api = {
  getPlanList: async () => {
    const response = await fetch('/api/plan');
    const body = await response.json();

    if (body.status !== 'success') {
      throw Error(body.message)
    }
    return body;
  }
}

export default api