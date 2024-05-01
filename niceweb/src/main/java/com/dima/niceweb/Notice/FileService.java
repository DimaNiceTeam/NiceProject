package com.dima.niceweb.Notice;

import java.io.File;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public class FileService {
    // 1) 서버에 디렉토리가 없으면 디렉토리 생성
    // 2) 원본 파일명을 꺼내서 저장파일명(랜덤값 or 밀리세컨)을 새롭게 작성
    // 3) 디렉토리에 파일을 저장하는 작업 수행
    // 4) 저장파일명을 반환하여 DB에 저장할 수 있도록 함

    public static String saveFile(MultipartFile uploadFile, String uploadPath) { // uploadPath : application에서 설정했음

        // 파일이 첨부되면 디렉토리(폴더)가 있는지 확인
        // 없으면 생성, 있으면 그대로 사용
        if (!uploadFile.isEmpty()) {
            File path = new File(uploadPath);
            if (!path.isDirectory()) {
                path.mkdirs();
            }
        }

        // 2) 파일명 바꾸는 법
        // bts.jpg => 원본 파일명 추출
        // bts
        // jpg
        //
        // 랜덤값 발생: asds
        // bts_asds.jpg

        // 원본파일명 추출
        // uploadFile과 OriginalFilename을 따로 쓰는 이유 : a와 b가 같은 파일을 올려서 저장하면 a의 파일이 사라짐.
        // 방지하기 위해 파일 이름을 랜덤값 발생해서 어쩌구~이런 복잡한 방식을 거치는 것임.
        // 이렇게 되면 같은 파일을 올려도 다른 이름을 갖기 때문에 안 사라짐.
        String originalFileName = uploadFile.getOriginalFilename();

        // 랜덤값 발생
        String uuid = UUID.randomUUID().toString();

        // 원본에서 파일명과 확장자 분리작업(.을 기준으로 분리)
        String filename;
        String ext;
        String savedFileName;

        // . 위치 찾음. 없으면 -1 반환
        int position = originalFileName.lastIndexOf(".");

        // 확장자가 없는 경우
        if (position == -1)
            ext = "";

        // 확장자가 있는 경우
        else
            ext = "." + originalFileName.substring(position + 1); // . 뒤의 모든것

        filename = originalFileName.substring(0, position); // 맨 앞부터 . 앞까지
        savedFileName = filename + "_" + uuid + ext; // savedFileName : bts_asds.jpg

        // 3) 서버의 저장공간에 파일 저장
        File serverFile = null;

        serverFile = new File(uploadPath + "/" + savedFileName); // uploadPath/bts_asds.jpg

        try {
            uploadFile.transferTo(serverFile);
            // 업로드된 파일(uploadFile)을 서버에 저장할 파일(serverFile)로 전송. 파일을 실제로 서버의 디렉토리에 저장
        } catch (Exception e) {
            savedFileName = null;
            e.printStackTrace();
        }
        return savedFileName; // 저장 파일명 반환
    }

    // 저장장치에 저장된 파일을 삭제(경로 + 파일명)
    public static boolean deleteFile(String fullPath) {
        boolean result = false; // 삭제 여부를 반환

        File delFile = new File(fullPath); // 경로랑 파일 상태가 포함되어 잇음
        if (delFile.isFile()) { // 넘어온 fullPath가 진짜 파일이야?
            result = delFile.delete();
        }
        return result;
    }
}
