const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 8082;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

let data = {
    id : 0,
    size : 0,
    title : '오징어',
    latitude : 0,
    longitude : 0,
    src1 : ''
    // 다른 원하는 속성들을 추가할 수 있습니다.
};

async function getAddressFromCoordinates(longitude, latitude) {
  const apiKey = 'f55712663179d181a09716e3fbe37ac0';
  const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`;

  try {
    const response = await axios({
      method : 'get',
      url : url,
      headers : {
        Authorization: `KakaoAK ${apiKey}`
      }
    });
    console.log(response.data.documents[0].address);
    return response.data.documents[0].address;
  }
  catch(error) {
    console.error("error=",error)
    throw error;
  }
}

const defaultData = [
    { id : 1, size:30 ,title:"가자미", latitude: 35.0968275, longitude: 128.8538282, src1 : "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800" },
    { id : 2, size:50,title:"참돔", latitude: 35.0968275+0.001, longitude: 128.8538282, src1: "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800" },
    { id : 3, size:300 ,title:"고래", latitude: 35.0968275+0.002, longitude: 128.8538282, src1: "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800"},
    { id : 4, size:200 ,title:"상어", latitude: 35.0968275+0.003, longitude: 128.8538282, src1: "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800"},
    { id : 5, size:60 ,title:"돌돔", latitude: 35.0968275+0.004, longitude: 128.8538282, src1: "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800" },
    { id : 6, size:30 ,title:"우럭", latitude: 35.0968275+0.005, longitude: 128.8538282, src1: "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800" },
    { id : 7, size:35 ,title:"광어", latitude: 35.0968275+0.006, longitude: 128.8538282, src1: "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800" },
    { id : 8, size:25 ,title:"고등어", latitude: 35.0968275+0.007, longitude: 128.8538282, src1: "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800" },
    { id : 9, size:10 ,title:"불가사리", latitude: 35.0968275+0.008, longitude: 128.8538282, src1: "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800" },
    { id : 10,size:13 ,title:"해삼", latitude: 35.0968275+0.009, longitude: 128.8538282,src1 : "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800" },
]
app.post('/update', async (req, res) => {
  const newData = req.body;
  // console.log("Received data from client:", newData);

  // 서버 데이터를 업데이트합니다.

  console.log(data)
    // API를 통해 주소 정보를 가져옵니다.
  try {
    const address = await getAddressFromCoordinates(newData.longitude, newData.latitude);
    data = {
      id: newData.id,
      size: newData.size,
      title: newData.title,
      latitude: newData.latitude,
      longitude: newData.longitude,
      src1: newData.src1,
      address : address.address_name


    };
  } catch (error) {
    console.error("Error while getting address:", error.message);
  }
  
  defaultData.push(data)
  // 연결된 모든 SSE 클라이언트에게 업데이트된 데이터를 전송합니다.
  clients.forEach((client) => {
    data.timestamp = new Date().toISOString();
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });

  res.status(200).json(defaultData);
});

const clients = []; // SSE 클라이언트를 저장할 배열

app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 클라이언트를 저장합니다.
  clients.push(res);
  // 클라이언트와의 연결이 끊어지면 배열에서 제거합니다.
  res.on('close', () => {
    console.log("Connection closed. Removing client.");
    const index = clients.indexOf(res);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

const server = app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

