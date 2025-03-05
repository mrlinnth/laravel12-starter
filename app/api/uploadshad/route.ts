import { S3Service, FilePayloadSchema } from "@/components/uploadshad/utils";
import { NextResponse, NextRequest } from "next/server";
const acceptedTypes = ["image/png", "image/jpeg"];
const maxFileSize = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  const raw = await request.json(); // Access the request body
  const filePayload = FilePayloadSchema.safeParse(raw);
  if (!filePayload.success || !filePayload.data)
    return NextResponse.json(
      { message: "Missing payload values" },
      {
        status: 400,
      }
    );
  //   console.log("Hello: ", filePayload.data);
  const s3Service = new S3Service();

  const signedURLResult = await s3Service.getSignedURL(filePayload.data, {
    acceptedTypes,
    maxFileSize,
  });

  if (signedURLResult.failure) {
    console.log("Failed to generate signed URL.", signedURLResult);
    return new NextResponse(JSON.stringify({ message: "Failed to generate signed URL." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return NextResponse.json(signedURLResult, {
    status: 200,
  });
}

export async function DELETE(request: NextRequest) {
  const params = new URL(request.url).searchParams; // Access the request.url
  const url = params.get("url");

  if (!url) return NextResponse.json({ message: "Missing query values" }, { status: 400 });

  const s3Service = new S3Service();
  const deleteResult = await s3Service.deleteFile(url);

  if (deleteResult.failure || deleteResult.success === false)
    return NextResponse.json({ message: "Failed to delete file." }, { status: 500 });
  console.log("Result: ", deleteResult);

  return NextResponse.json(deleteResult, { status: 200 });
}
