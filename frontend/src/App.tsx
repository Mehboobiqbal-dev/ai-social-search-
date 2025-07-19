import React, { useState } from 'react';
import { Container, Typography, Box, Button, CircularProgress, Avatar, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
    setResult(null);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSearch = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const res = await fetch('http://localhost:8000/search-face/', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Failed to search. Backend not available.' });
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight={700}>
          Face Search Engine
        </Typography>
        <Typography align="center" color="text.secondary" gutterBottom>
          Upload a photo to search for a person across the internet.
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{ mb: 2 }}
          >
            Upload Photo
            <input type="file" accept="image/*" hidden onChange={handleFileChange} />
          </Button>
          {preview && (
            <Avatar src={preview} alt="Preview" sx={{ width: 120, height: 120, mb: 2 }} />
          )}
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedFile || loading}
            onClick={handleSearch}
            sx={{ minWidth: 160 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
          </Button>
          {result && (
            <Box mt={3} width="100%">
              <Typography variant="h6" align="center">Result</Typography>
              <Paper sx={{ p: 2, mt: 1, background: '#f5f5f5' }}>
                <pre style={{ margin: 0, fontSize: 16 }}>{JSON.stringify(result, null, 2)}</pre>
              </Paper>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
