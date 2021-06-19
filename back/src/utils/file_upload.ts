'use strict';

import { HttpStatus } from '@nestjs/common';
import { extname } from 'path';
import * as fs from 'fs';
import { join } from 'path';
import { GlobalException } from 'src/common/exceptions/global_exception';
import dayjs from 'dayjs';

export const imageFilter = (req, file, callback) => {
  if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new GlobalException({
        statusCode: HttpStatus.BAD_REQUEST,
        msg: '이미지 파일이 아닙니다..',
        responseCode: 40000,
      }),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  const date = String(dayjs().format('hhmmss'));

  // const year = String(moment().year());
  // const month = String(moment().format('MM'));
  // const modulePath = req.originalUrl.split('/')[2];
  // const filePath = join(
  //   process.cwd(),
  //   `/uploads/${modulePath}/${year}/${month}`,
  // );

  const mem = req.mem_id ? String(req.mem_id) : 0;
  const randomName = Array(6)
    .fill(null)
    .map(() => Math.round(Math.random() * 10).toString(10))
    .join('');

  callback(null, `${date}${mem}${randomName}${fileExtName}`);
};

export const uploadPath = (req, file, callback) => {
  const year = String(dayjs().year());
  const month = String(dayjs().format('MM'));
  const modulePath = req.originalUrl.split('/')[2];
  const filePath = join(
    process.cwd(),
    `/uploads/${modulePath}`,
  );
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }
  callback(null, `./uploads/${modulePath}`);
};

/**
 * 회원정보 수정 이미지(프로필, 배경) 업로드
 */
export const myPageImageUpload = async (
  file,
  folder: string,
  mem_id: number,
  ext = '.jpg',
) => {
  const path = await filePath(folder);
  const randomName = await fileNameMaker(ext, mem_id);
  const dateInfo = await dateString();

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  fs.writeFile(path + '/' + randomName, file, (err) => {
    if (err) console.log(err);
  });

  return `${dateInfo.year}/${dateInfo.month}/${randomName}`;
};

/**
 * 파일 업로드 관련 함수들
 */
export const dateString = () => {
  const result = {
    year: String(dayjs().year()),
    month: String(dayjs().format('MM')),
  };
  return result;
};

export const filePath = (folderName: string) => {
  const year = String(dayjs().year());
  const month = String(dayjs().format('MM'));
  const path = join(process.cwd() + `/uploads/${folderName}/${year}/${month}`);

  return path;
};

export const fileNameMaker = (ext: string, mem_id) => {
  const date = String(dayjs().format('hhmmss'));
  const randomName = Array(6)
    .fill(null)
    .map(() => Math.round(Math.random() * 10).toString(10))
    .join('');
  const fileName = `${date}${String(mem_id)}${randomName}${ext}`;

  return fileName;
};

export const dataURLtoFile = (dataurl: string) => {
  const arr = dataurl.split(',');
  return Buffer.from(String(arr[1]), 'base64');
};
