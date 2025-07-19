from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/search-face/")
async def search_face(file: UploadFile = File(...)):
    # Placeholder for face search logic
    return JSONResponse({"status": "received", "filename": file.filename})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)