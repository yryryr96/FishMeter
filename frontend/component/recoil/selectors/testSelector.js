import { atom,selector,selectorFamily } from "recoil"

export const testDefaultGps = atom({
    key : 'testDefaultGps',
    default : [
        { id : 1, size:30 ,title:"가자미", latitude: 35.0968275, longitude: 128.8538282, src1 : "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800"       , address : '부산 녹산동 어딘가 50-3'},
        { id : 2, size:50,title:"참돔", latitude: 35.0968275+0.001, longitude: 128.8538282, src1: "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800"     , address : '부산 녹산동 어딘가 50-3'},
        { id : 3, size:300 ,title:"고래", latitude: 35.0968275+0.002, longitude: 128.8538282, src1: "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800"   , address : '부산 녹산동 어딘가 50-3'},
        { id : 4, size:200 ,title:"상어", latitude: 35.0968275+0.003, longitude: 128.8538282, src1: "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800"   , address : '부산 녹산동 어딘가 50-3'},
        { id : 5, size:60 ,title:"돌돔", latitude: 35.0968275+0.004, longitude: 128.8538282, src1: "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800"    , address : '부산 녹산동 어딘가 50-3'},
        { id : 6, size:30 ,title:"우럭", latitude: 35.0968275+0.005, longitude: 128.8538282, src1: "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800"    , address : '부산 녹산동 어딘가 50-3'},
        { id : 7, size:35 ,title:"광어", latitude: 35.0968275+0.006, longitude: 128.8538282, src1: "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800"    , address : '부산 녹산동 어딘가 50-3'},
        { id : 8, size:25 ,title:"고등어", latitude: 35.0968275+0.007, longitude: 128.8538282, src1: "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800"  , address : '부산 녹산동 어딘가 50-3'},
        { id : 9, size:10 ,title:"불가사리", latitude: 35.0968275+0.008, longitude: 128.8538282, src1: "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800", address : '부산 녹산동 어딘가 50-3' },
        { id : 10,size:13 ,title:"해삼", latitude: 35.0968275+0.009, longitude: 128.8538282,src1 : "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800"    , address : '부산 녹산동 어딘가 50-3'},
    ]
})

export const filteredArticle = selectorFamily({
    key : 'filteredArticle',
    get: ({param1, param2}) => ({get}) => get(testDefaultGps).filter((item) => item.latitude === param1 && item.longitude === param2)
})

export const userId = atom({
    key: "userId",
    default: null,
  });
  