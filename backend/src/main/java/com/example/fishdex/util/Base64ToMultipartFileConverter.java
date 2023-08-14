package com.example.fishdex.util;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import java.io.*;
import java.util.Base64;
import java.util.Random;

@NoArgsConstructor
public class Base64ToMultipartFileConverter {

    public static MultipartFile base64ToMultipartFile(String base64Data) throws IOException {
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();
        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        if (StringUtils.isEmpty(base64Data)) {
            return null;
        }

        // Base64 디코딩
        byte[] decodedBytes = Base64.getDecoder().decode(base64Data);

        // MultipartFile 객체 생성
        MultipartFile multipartFile = new MultipartFile() {
            @Override
            public String getName() {
                return generatedString + ".jpg";
            }

            @Override
            public String getOriginalFilename() {
                return generatedString + ".jpg";
            }

            @Override
            public String getContentType() {
                return "application/octet-stream"; // 파일 컨텐츠 타입 지정
            }

            @Override
            public boolean isEmpty() {
                return decodedBytes.length == 0;
            }

            @Override
            public long getSize() {
                return decodedBytes.length;
            }

            @Override
            public byte[] getBytes() throws IOException {
                return decodedBytes;
            }

            @Override
            public InputStream getInputStream() throws IOException {
                return new ByteArrayInputStream(decodedBytes);
            }

            @Override
            public void transferTo(File dest) throws IOException, IllegalStateException {
                try (FileOutputStream fos = new FileOutputStream(dest)) {
                    fos.write(decodedBytes);
                }
            }
        };

        return multipartFile;
    }
}
