# Node js encryption and decryption example

### To encrypt file
With the video example:
```bash
npm run enc-file orgPath=videoTest.mp4 destPath=enc/videoTestEncrypted.mp4 algorithm=aes-128-ofb  key=1234567890123456 iv=1234567890123456
```

### To decrypt the file
```bash
npm run dec-file orgPath=enc/videoTestEncrypted.mp4 destPath=dec/videoTestDecrypted.mp4  algorithm=aes-128-ofb  key=1234567890123456 iv=1234567890123456
```
