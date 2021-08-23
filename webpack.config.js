// webpack 구성옵션 지정
const path = require('path');
// Nodejs 환경에서 언제든지 사용 할 수 있는 전역 모듈 path를 변수 path에 할당 해주고
// resolve 라는 함수를 사용하는데 resolve 함수는 첫번째 인수와 두번째 인수에 있는 기본적인 경로를 합쳐주는 함수
// __dirname : Nodejs 에서 사용 하는 전역적변수 이다. 따로 설정 할 필요 없이 불러와 사용 할 수있고 
// 현재 파일이 있는 그 경로를 지칭 

// 개발 서버 오픈하기
const HtmlPlugin = require('html-webpack-plugin')

// 동적 파일 불러오기
const CopyPlugin = require('copy-webpack-plugin')

// 내보내기
module.exports = {
  // entry : 파일을 읽어들이기 시작하는 진입점 설정 (어디에서 부터 내용을 읽기 시작하면 되는지)
  // webpack 에서는 보통 js 파일을 진입점으로 설정 한다.
  entry : './js/main.js',

  // 결과물(번들)을 반환하는 설정 (entry라는 옵션을 통해서 읽어드린 파일의 기본적인 연결관계를 webpack이 분석 해서 결과를 내어주는 구성 작성)
    output : {
      // path: 'dist', // 어떠한 경로에 결과물을 줄것인가 , 상대 경로 입력 하면 안되고 무조건 Nodejs 에서 요구 하는 절대 경로
      // path : path.resolve(__dirname, 'dist'),
      // filename: 'main.js',  // entry랑 똑같이 쓰면 된다.. 
      clean: true
    },

    // css 파일 읽기 위한 모듈 
    module : {
      rules: [
        {
          test: /\.s?css$/, // .css / .scss 라고 끝나는 파일을 찾는 정규 표현식
          use : [
            // 설치한 패키지명 명시
            'style-loader', // 해석된 것을 사용 하는 용도 ( html 파일의 style 태그에 삽입을 한다.)
            'css-loader' ,// 자바스크립트 파일에서 css 파일을 해석 할 수 있는 용도
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.js$/,
          user : [
            'babel-loader'
          ]
        }
      ]
    },

    // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
    plugins: [
      new HtmlPlugin({
        template: './index.html'
      }),
      new CopyPlugin({
        patterns: [{
          from: 'static'
        }]
      })
    ],

    devServer : {
      host: 'localhost'
    }

}

// 구성 옵션을 바꾸면 구성 옵션을 바꾸기 전 파일은 그대로 남아 있다. (clean: true 로 해결 가능)

// 결론 : entry라는 옵션으로 어디로 진입 (여러개 설정가능)해야하는지 알려주고 처리가 완료 되면 결과물을 어디에 내주어야 하는지 output이라는 옵션을 통해 설정 할 수 있다.

