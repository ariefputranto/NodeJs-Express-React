const api = {
  getFeatureList: async () => {
    const response = await fetch('/api/feature');
    const body = await response.json();

    if (body.status !== 'success') {
      throw Error(body.message) 
    }
    return body;
  }
}

export default api