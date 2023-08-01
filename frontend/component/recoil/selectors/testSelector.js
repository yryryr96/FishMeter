import { atom,selector,selectorFamily } from "recoil"

export const testDefaultGps = atom({
    key : 'testDefaultGps',
    default : [
        { latitude: 35.0968275, longitude: 128.8538282, image : "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800" },
        { latitude: 35.0968275+0.001, longitude: 128.8538282, image : "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800" },
        { latitude: 35.0968275+0.002, longitude: 128.8538282, image : "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800"},
        { latitude: 35.0968275+0.003, longitude: 128.8538282, image : "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800"},
        { latitude: 35.0968275+0.004, longitude: 128.8538282, image : "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800" },
        { latitude: 35.0968275+0.005, longitude: 128.8538282, image : "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800" },
        { latitude: 35.0968275+0.006, longitude: 128.8538282, image : "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800" },
        { latitude: 35.0968275+0.007, longitude: 128.8538282, image : "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800" },
        { latitude: 35.0968275+0.008, longitude: 128.8538282, image : "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800" },
        { latitude: 35.0968275+0.009, longitude: 128.8538282, image : "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w800" },
    ]
})

export const filteredArticle = selectorFamily({
    key : 'filteredArticle',
    get: ({param1, param2}) => ({get}) => get(testDefaultGps).filter((item) => item.latitude === param1 && item.longitude === param2)
})