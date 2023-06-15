import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UploadImages from "../upload/index";

describe("UploadImages", () => {
  test("renders without error", () => {
    render(<UploadImages fileList={[]} setFileList={() => {}} />);
    const uploadButton = screen.getByText("Upload");
    expect(uploadButton).toBeInTheDocument();
  });
});
