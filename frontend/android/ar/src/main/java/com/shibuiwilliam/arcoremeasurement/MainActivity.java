package com.fishpjt.ar;

import android.content.Intent;
import android.media.Image;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import java.io.ByteArrayOutputStream;

import com.google.ar.core.Anchor;
import com.google.ar.core.Frame;
import com.google.ar.core.HitResult;
import com.google.ar.core.exceptions.DeadlineExceededException;
import com.google.ar.core.exceptions.NotYetAvailableException;
import com.google.ar.sceneform.AnchorNode;
import com.google.ar.sceneform.ArSceneView;
import com.google.ar.sceneform.Scene;
import com.google.ar.sceneform.ux.ArFragment;
import com.google.ar.sceneform.ux.TransformableNode;
import com.shibuiwilliam.arcoremeasurement.api.ApiInterface;
import com.fishpjt.ar.ImageConverter;
import com.fishpjt.ar.LengthMeasurer;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Timer;
import java.util.TimerTask;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    private ArFragment arFragment;
    private ArSceneView arSceneView;
    private Scene scene;

    private final ArrayList<Anchor> anchors = new ArrayList<>();
    private final ArrayList<AnchorNode> anchorNodes = new ArrayList<>();

    private TextView fishTextView;
    private TextView lengthTextView;
    private Button button;

    private Button reactButton;

    private ApiInterface api;

    // AI 서버 baseUrl
    private final String baseUrl = "http://192.168.140.141:8000/";

    // API 호출 결과 0 = 쥐노래미, 1 = 감성돔, 2 = 말쥐치, 3 = 돌돔 ...
    private final String[] fish = {"쥐노래미", "감성돔", "말쥐치", "돌돔", "쏘가리", "참돔", "옥돔", "송어"};

    private Button finishButton;

    /*
     "버튼": 버튼 클릭 API 호출
     "자동": 1초에 10번씩 API 호출
     */
    private final String by = "자동";

    private BoundingBoxView boundingBoxView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // init
        setContentView(R.layout.activity_main);
        arFragment = (ArFragment) getSupportFragmentManager().findFragmentById(R.id.ar_fragment);
        arSceneView = arFragment.getArSceneView();
        scene = arSceneView.getScene();
        fishTextView = findViewById(R.id.fish_textView);
        lengthTextView = findViewById(R.id.length_textView);
        button = findViewById(R.id.button);
        finishButton = findViewById(R.id.finish_button);
        reactButton = findViewById(R.id.finish_button2);
        boundingBoxView = findViewById(R.id.bounding_box_view);

        // API 설정
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseUrl)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        api = retrofit.create(ApiInterface.class);

        callApiBy(by);

        finishButton.setOnClickListener(v -> {
            finish();
        });
        reactButton.setOnClickListener(v -> {
            String fishCategory = fishTextView.getText().toString();
            String fishLength = lengthTextView.getText().toString();
//            String fishCategory = "참돔";
//            String fishLength = "45";
            Bitmap imageBitmap = null;  // 이미지 비트맵 변수 초기화

            // 이미지를 가져오는 코드
            Frame arFrame = arSceneView.getArFrame();
            if (arFrame == null) {
                // AR 프레임이 없는 경우 예외 처리
                Toast.makeText(getApplicationContext(), "AR 프레임이 없습니다.", Toast.LENGTH_SHORT).show();
                return;
            }

            File imageFile;
            try {
                imageFile = getImageFileFromFrame(arFrame);
                imageBitmap = BitmapFactory.decodeFile(imageFile.getAbsolutePath());  // 이미지 비트맵 로딩
            } catch (NotYetAvailableException e) {
                // 이미지 파일을 가져올 수 없는 경우 예외 처리
                Toast.makeText(getApplicationContext(), "이미지 파일을 가져올 수 없습니다.", Toast.LENGTH_SHORT).show();
                return;
            } catch (DeadlineExceededException e) {
                // 이미지 파일을 가져오는 도중 예외 처리
                e.printStackTrace();
                Toast.makeText(getApplicationContext(), "이미지 파일을 가져오는 도중 오류가 발생했습니다.", Toast.LENGTH_SHORT).show();
                return;
            }

            if ("어종".equals(fishCategory) || "???".equals(fishLength)) {
                // 이미지, 어종, 체장 데이터 중 하나라도 없는 경우 예외 처리
                Toast.makeText(getApplicationContext(), "이미지, 어종, 체장 데이터가 모두 있어야 합니다.", Toast.LENGTH_SHORT).show();
                return;
            }

            // 어종과 길이 출력
            Log.d("FishCategory", "어종: " + fishCategory);
            Log.d("FishLength", "길이: " + fishLength);
            // 데이터 전송 로직
            if(fishCategory=="어종" || fishLength=="체장: ??? cm"){
                Log.d("length", fishLength);
                Log.d("category", fishCategory);
                return;
            }else
            {
            Bundle bundle = new Bundle();
            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            imageBitmap.compress(Bitmap.CompressFormat.PNG, 100, stream);
            byte[] byteArray = stream.toByteArray();
            bundle.putByteArray("image", byteArray);
            bundle.putString("category", fishCategory);
            bundle.putString("length", fishLength);

            Intent intent = new Intent();
            intent.setAction("com.fishpjt.ACTION_SEND_DATA");
            intent.putExtra("dataBundle", bundle);
            sendBroadcast(intent);

            // 전송 완료 메시지 표시
            Toast.makeText(getApplicationContext(), "데이터 전송 완료", Toast.LENGTH_SHORT).show();

            // 여기에 데이터를 제대로 받았을 때 종료 처리
            finish();}
        });



    }

    private void callApiBy(String by) {
        switch (by) {
            case "버튼":
                button.setOnClickListener(v -> {
                    tmp();
                });
                break;
            case "자동":
                TimerTask timerTask = new TimerTask() {
                    @Override
                    public void run() {
                        tmp();
                    }
                };

                Timer timer = new Timer();
                /*
                 두 번째 인자: 최초에 몇 초 후에 실행?
                 세 번째 인자: 최초 실행 후 몇 초 마다 실행?
                 둘 다 ms 단위 (1000 = 1초)
                 */
                timer.schedule(timerTask, 3000, 100);
                break;
            default:
                throw new RuntimeException("버튼 또는 자동 中 하나 선택");
        }
    }

    private void tmp() {
        Frame arFrame = arSceneView.getArFrame();

        if (arFrame == null) return;

        // ARCore의 프레임에서 이미지 파일 추출
        File imageFile;
        try {
            imageFile = getImageFileFromFrame(arFrame);
        } catch (NotYetAvailableException e) {
            runOnUiThread(new Runnable() { // runOnUiThread 내부에 Runnable을 전달
                @Override
                public void run() {
//                    Toast.makeText(getApplicationContext(), "NotYetAvailableException", Toast.LENGTH_SHORT).show();
                }
            });
            return;
        } catch (DeadlineExceededException e) {
            e.printStackTrace();
            return;
        }

        // 추출한 이미지 파일로 어종 분석 및 체장 측정
        detectFish(imageFile);
    }


    private File getImageFileFromFrame(Frame arFrame) throws NotYetAvailableException {
        Image image = arFrame.acquireCameraImage();
        byte[] jpeg = ImageConverter.convertYuvToJpeg(image);
        image.close();

        // 이미지를 파일로 저장
        String dirPath = getApplicationContext().getExternalFilesDir(Environment.DIRECTORY_DCIM).toString();
        File dir = new File(dirPath);
        if (!dir.exists()) dir.mkdirs();
        String date = new SimpleDateFormat("yyyyMMddHHmmss", Locale.getDefault()).format(new Date());
        String fileName = date + ".jpg";
        String filePath = dirPath + "/" + fileName;

        BufferedOutputStream bos;
        try {
            bos = new BufferedOutputStream(new FileOutputStream(filePath));
            bos.write(jpeg);
            bos.flush();
            bos.close();
        } catch (Throwable e) {
            e.printStackTrace();
        }
        //

        return new File(filePath);
    }

    private void detectFish(File imageFile) {
        RequestBody requestBody = RequestBody.create(MediaType.parse("image/*"), imageFile);
        MultipartBody.Part imagePart = MultipartBody.Part.createFormData("file", imageFile.getName(), requestBody);
        Call<List<List<Float>>> call = api.detectFish(imagePart);
        call.enqueue(new Callback<List<List<Float>>>() {
            @Override
            public void onResponse(Call<List<List<Float>>> call, Response<List<List<Float>>> response) {
                if (response.isSuccessful()) {
                    List<List<Float>> results = response.body();
                    if (!results.isEmpty()) {   // 물고기가 검출된 경우
                        onDetectFish(results);
                    } else {                    // 물고기가 검출되지 않은 경우
                        boundingBoxView.clearBoundingBox();
                    }
                }
            }

            /*
             Fail이 발생할 경우
             1. AI 서버가 정상인지
             2. 정상이라면 baseUrl이 유효한지
             순서대로 검사
             */
            @Override
            public void onFailure(Call<List<List<Float>>> call, Throwable t) {
                Toast.makeText(MainActivity.this, "표면을 인식할 수 없습니다.\n화면에 주변을 좀 더 비춰주세요.", Toast.LENGTH_SHORT).show();
                Log.w("Fail", "onFailure: detectFish", t);
            }
        });
    }

    private void onDetectFish(List<List<Float>> results) {
        Frame arFrame = arSceneView.getArFrame();

        if (arFrame == null) return;

        int width = arSceneView.getWidth();
        int height = arSceneView.getHeight();
        for (List<Float> result : results) {
            /*
             ARCore에서 추출한 이미지는 640 x 480이기 때문에 기기 해상도 보정
             추출한 이미지의 위아래가 기기에 보이는 것보다 더 커서 추가 보정
             */
            float left = result.get(0) * (width / 640f);
            float top = (result.get(1) - 90) * (height / 300f);
            float right = result.get(2) * (width / 640f);
            float bottom = (result.get(3) - 90) * (height / 300f);

            List<HitResult>[] hitResultLists = new List[2];

            // 가로
            Double horizontal = null;
            hitResultLists[0] = arFrame.hitTest(left, (top + bottom) / 2);
            hitResultLists[1] = arFrame.hitTest(right, (top + bottom) / 2);
            if (!hitResultLists[0].isEmpty() && !hitResultLists[1].isEmpty()) {
                for (int i = 0; i < 2; i++) {
                    HitResult hitResult = hitResultLists[i].get(0);
                    createAnchor(hitResult);
                }
                horizontal = LengthMeasurer.measureLength(anchorNodes.get(0).getWorldPosition(), anchorNodes.get(1).getWorldPosition()) * 100;
                clear();
            }

            // 세로
            Double vertical = null;
            hitResultLists[0] = arFrame.hitTest((left + right) / 2, top);
            hitResultLists[1] = arFrame.hitTest((left + right) / 2, bottom);
            if (!hitResultLists[0].isEmpty() && !hitResultLists[1].isEmpty()) {
                for (int i = 0; i < 2; i++) {
                    HitResult hitResult = hitResultLists[i].get(0);
                    createAnchor(hitResult);
                }
                vertical = LengthMeasurer.measureLength(anchorNodes.get(0).getWorldPosition(), anchorNodes.get(1).getWorldPosition()) * 100;
                clear();
            }

            /*
             가로, 세로 둘 중 하나라도 null이라면 정확한 체장 측정 불가
             둘 다 null이 아닐때만 둘 중 큰 값으로 체장 결정
             */
            String length = "???";
            if (horizontal != null && vertical != null) {
                length = String.format("%.2f", Math.max(horizontal, vertical));
            }

            int f = result.get(5).intValue();
            fishTextView.setText(fish[f]);
            lengthTextView.setText(String.format("체장: %s cm", length));
            boundingBoxView.setBoundingBox(left, top, right, bottom);
        }
    }

    private void createAnchor(HitResult hitResult) {
        Anchor anchor = hitResult.createAnchor();
        anchors.add(anchor);

        AnchorNode anchorNode = new AnchorNode(anchor);
        anchorNode.setSmoothed(true);
        anchorNode.setParent(scene);
        anchorNodes.add(anchorNode);

        TransformableNode transformableNode = new TransformableNode(arFragment.getTransformationSystem());
        transformableNode.getRotationController().setEnabled(false);
        transformableNode.getScaleController().setEnabled(false);
        transformableNode.getTranslationController().setEnabled(true);
        transformableNode.setRenderable(transformableNode.getRenderable());
        transformableNode.select();
    }

    private void clear() {
        anchors.clear();
        for (AnchorNode anchorNode : anchorNodes) {
            scene.removeChild(anchorNode);
            anchorNode.setEnabled(false);
            anchorNode.getAnchor().detach();
            anchorNode.setParent(null);
        }
        anchorNodes.clear();
    }
}
