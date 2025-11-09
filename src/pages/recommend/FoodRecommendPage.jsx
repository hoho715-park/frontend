import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import './FoodRecommendPage.css';

const FoodRecommendPage = () => {
  const location = useLocation();
  const {
    bodyType = '태양인',
    formData,
    measureTime,
    source,
    fisherScores,
    percentages,
    dominantType,
  } = location.state || {};

  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);

  const typePrefix = {
    '태양인': 'taeyang',
    '태음인': 'taeum',
    '소양인': 'soyang',
    '소음인': 'soeum',
  };

  const getYoutubeThumbnail = (url) => {
    const videoId = url.split('v=')[1];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const FOOD_DATA = {
    '태양인': {
      good: [
        {
          title: '해산물',
          desc: '조개류 · 새우 · 게',
          dishes: [
            {
              name: '새우볶음밥',
              recipe: [
                '밥은 고슬고슬하게 지어둡니다. 갓 지은 따뜻한 밥을 식혀 두면 볶을 때 알갱이가 잘 살아납니다.',
                '팬에 기름을 두르고 다진 마늘과 양파를 먼저 볶아 향을 냅니다.',
                '새우를 넣고 중불에서 2~3분간 볶아 새우의 색이 붉게 변하도록 합니다.',
                '밥을 넣고 간장, 소금, 후추로 간을 맞춘 뒤 골고루 섞어줍니다.',
                '마지막으로 파를 넣고 센불에서 30초 정도 빠르게 볶아 불맛을 살립니다.',
              ],
              videos: [
                'https://www.youtube.com/watch?v=11lVLe1vnb0',
                'https://www.youtube.com/watch?v=gx7GjyacUJg',
                'https://www.youtube.com/watch?v=kR77WlHRZrs',
              ],
            },
            {
              name: '조개탕',
              recipe: [
                '조개를 소금물에 1시간 정도 해감하여 모래를 완전히 제거합니다.',
                '냄비에 물을 붓고 조개, 마늘, 생강, 대파를 넣어 끓입니다.',
                '조개가 입을 벌리면 간을 맞추고, 마지막에 미나리를 넣어 향을 더해줍니다.',
                '기호에 따라 청양고추를 추가하면 칼칼한 맛을 즐길 수 있습니다.',
              ],
              videos: [
                'https://www.youtube.com/watch?v=WwqHQcSFUYI',
                'https://www.youtube.com/watch?v=nsDn24g1_po',
                'https://www.youtube.com/watch?v=H87kEq0yJ1c',
              ],
            },
            {
              name: '게살죽',
              recipe: [
                '게살을 준비하고, 쌀은 30분 정도 불려줍니다.',
                '냄비에 쌀과 물을 넣고 중불에서 천천히 끓여줍니다.',
                '쌀이 퍼지기 시작하면 게살과 다진 마늘을 넣습니다.',
                '죽이 걸쭉해질 때까지 저어가며 끓인 뒤 소금으로 간을 맞춥니다.',
                '마지막에 참기름을 몇 방울 떨어뜨리면 풍미가 더욱 좋아집니다.',
              ],
              videos: [
                'https://www.youtube.com/watch?v=c-U8mOjASL8',
                'https://www.youtube.com/watch?v=TKvxLOGiWrE',
                'https://www.youtube.com/watch?v=SJjCNVktc6c',
              ],
            },
          ],
        },
        {
          title: '녹황색 채소',
          desc: '브로콜리 · 청경채 · 시금치',
          dishes: [
            {
              name: '브로콜리무침',
              recipe: [
                '브로콜리는 송이로 잘라 끓는 소금물에 1분 정도 데친 후 찬물에 헹궈 색을 유지합니다.',
                '물기를 제거한 뒤 간장, 다진 마늘, 깨소금, 참기름을 넣어 버무립니다.',
                '간이 골고루 배도록 가볍게 섞어주며, 마지막에 소금으로 맛을 조정합니다.',
              ],
              videos: [
                'https://www.youtube.com/watch?v=nL41mkmg2Qg',
                'https://www.youtube.com/watch?v=flFWnRrOwdU',
                'https://www.youtube.com/watch?v=iidrv1JFutw',
              ],
            },
            {
              name: '시금치나물',
              recipe: [
                '시금치는 뿌리를 자르고 깨끗이 씻어 끓는 물에 살짝 데칩니다.',
                '찬물에 헹군 뒤 물기를 꼭 짜고, 5cm 길이로 썰어둡니다.',
                '간장, 참기름, 다진 마늘, 깨소금을 넣고 고루 버무립니다.',
              ],
              videos: [
                'https://www.youtube.com/watch?v=VD2Pnd78oAg',
                'https://www.youtube.com/watch?v=SkwYtWkF94U',
                'https://www.youtube.com/watch?v=_j-rxiQ-eqc',
              ],
            },
            {
              name: '청경채볶음',
              recipe: [
                '청경채를 깨끗이 씻어 길게 반으로 자릅니다.',
                '팬에 마늘을 넣고 향이 날 때까지 볶다가 청경채를 넣습니다.',
                '굴소스와 간장을 넣어 빠르게 볶고, 마지막에 참기름을 살짝 두릅니다.',
              ],
              videos: [
                'https://www.youtube.com/watch?v=ub5OMRzd3j4',
                'https://www.youtube.com/watch?v=33RjSrPNau0',
                'https://www.youtube.com/watch?v=kWUwa53LJC0',
              ],
            },
          ],
        },
        {
          title: '콩류',
          desc: '두부 · 청국장 · 낫토',
          dishes: [
            {
              name: '청국장찌개',
              recipe: [
                '냄비에 멸치육수를 붓고 끓입니다.',
                '된장 한 스푼과 청국장을 넣어 풀어줍니다.',
                '두부, 호박, 대파, 마늘을 넣고 10분 정도 끓입니다.',
                '마지막에 청양고추를 넣어 얼큰하게 마무리합니다.',
              ],
              videos: [
                'https://www.youtube.com/watch?v=dSyLbmn0SHM',
                'https://www.youtube.com/watch?v=_EXRrY4amTo',
                'https://www.youtube.com/watch?v=WTPSPd3G_Jk',
              ],
            },
            {
              name: '낫토덮밥',
              recipe: [
                '밥 위에 낫토를 올리고 간장 한 스푼과 김가루를 뿌립니다.',
                '잘 섞어 점성이 생기도록 저어줍니다.',
                '기호에 따라 계란노른자나 김치 토핑을 추가해도 좋습니다.',
              ],
              videos: [
                'https://www.youtube.com/watch?v=iP1GfcWIVxI',
                'https://www.youtube.com/watch?v=81uMWfe_F24',
                'https://www.youtube.com/watch?v=byXLa3YEHA8',
              ],
            },
            {
              name: '콩국수',
              recipe: [
                '불린 콩을 삶아 껍질을 벗긴 뒤 믹서기에 물을 조금씩 넣으며 곱게 갑니다.',
                '끓는 물에 소면을 삶아 찬물에 헹구고 체에 밭쳐 물기를 제거합니다.',
                '콩국을 그릇에 붓고 면을 넣은 후, 소금으로 간을 맞춥니다.',
                '오이채와 깨소금을 얹어 마무리합니다.',
              ],
              videos: [
                'http://youtube.com/watch?v=Sxi31LRvr40',
                'https://www.youtube.com/watch?v=JzyYs3lV2Gs',
                'https://www.youtube.com/watch?v=NZd9Qb10Zp0',
              ],
            },
          ],
        },
      ],
      bad: [
        { title: '육류', desc: '돼지고기 · 소고기 · 닭고기' },
        { title: '열성보양식', desc: '삼계탕 · 인삼 · 홍삼' },
        { title: '매운음식', desc: '청양고추 · 매운떡볶이 · 매운라면' },
      ],
    },
  };

  const prefix = typePrefix[bodyType];
  const data = FOOD_DATA[bodyType];
  const backLinkPath = source === 'qscc' ? '/result-qscc' : '/result';
  const allDishes = data.good.flatMap((group, i) =>
    group.dishes.map((dish, j) => ({
      ...dish,
      index: i * 3 + j + 1,
    }))
  );

  return (
    <>
      <Header />
      <div className="food-page-container">
        <h1>{bodyType} 음식 추천 🍽️</h1>

        {!selectedIngredient && !selectedDish && (
          <>
            <div className="food-section">
              <h2 className="good-title">👍 좋은 음식</h2>
              <div className="food-grid">
                {data.good.map((item, i) => (
                  <div
                    key={`good-${i}`}
                    className="food-card clickable"
                    onClick={() => setSelectedIngredient(item)}
                  >
                    <img
                      src={`/recommend/food/${prefix}_good_food_${i + 1}.png`}
                      alt={`${bodyType} 좋은 음식 ${i + 1}`}
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                    <hr />
                    <p className="food-title">{item.title}</p>
                    <p className="food-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="food-section">
              <h2 className="bad-title">👎 안좋은 음식</h2>
              <div className="food-grid">
                {data.bad.map((item, i) => (
                  <div key={`bad-${i}`} className="food-card">
                    <img
                      src={`/recommend/food/${prefix}_bad_food_${i + 1}.png`}
                      alt={`${bodyType} 안좋은 음식 ${i + 1}`}
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                    <hr />
                    <p className="food-title">{item.title}</p>
                    <p className="food-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {selectedIngredient && !selectedDish && (
          <div className="food-section">
            <h2 className="good-title">🍳 {selectedIngredient.title}로 만들 수 있는 음식</h2>
            <div className="food-grid">
              {selectedIngredient.dishes.map((dish) => {
                const matched = allDishes.find((d) => d.name === dish.name);
                return (
                  <div key={dish.name} className="food-card clickable">
                    <img
                      src={`/recommend/food/${prefix}_dish_${matched.index}.png`}
                      alt={dish.name}
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                    <hr />
                    <p className="food-title">{dish.name}</p>
                    <button
                      className="recipe-button"
                      onClick={() => setSelectedDish(matched)}
                    >
                      레시피 보기
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              className="back-btn"
              onClick={() => setSelectedIngredient(null)}
            >
              ← 재료 목록으로 돌아가기
            </button>
          </div>
        )}

        {selectedDish && (
          <div className="food-section">
            <h2 className="good-title">🍽️ {selectedDish.name} 레시피</h2>
            <img
              src={`/recommend/food/${prefix}_dish_${selectedDish.index}.png`}
              alt={selectedDish.name}
              className="recipe-image"
              onError={(e) => (e.target.style.display = 'none')}
            />

            {/* ✅ 여기 부분 수정됨 — 자동 번호 출력 */}
            <ol className="recipe-list">
              {selectedDish.recipe.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            {selectedDish.videos && (
              <div className="video-grid">
                {selectedDish.videos.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-card"
                  >
                    <img
                      src={getYoutubeThumbnail(url)}
                      alt={`video-${i + 1}`}
                      className="video-thumb"
                    />
                  </a>
                ))}
              </div>
            )}

            <button
              className="back-btn"
              onClick={() => setSelectedDish(null)}
            >
              ← 음식 목록으로 돌아가기
            </button>
          </div>
        )}

        <div className="back-button">
          <Link
            to={backLinkPath}
            state={{
              bodyType,
              formData,
              measureTime,
              fisherScores,
              percentages,
              dominantType,
              source,
            }}
          >
            ⬅ 결과 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </>
  );
};

export default FoodRecommendPage;
  