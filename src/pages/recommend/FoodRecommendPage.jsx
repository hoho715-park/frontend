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

  // ✅ 체질별 prefix
  const typePrefix = {
    '태양인': 'taeyang',
    '태음인': 'taeum',
    '소양인': 'soyang',
    '소음인': 'soeum',
  };

  // ✅ 유튜브 썸네일 자동 생성 함수
  const getYoutubeThumbnail = (url) => {
    const videoId = url.split('v=')[1];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  // ✅ 체질별 음식 데이터
  const FOOD_DATA = {
    '태양인': {
      good: [
        {
          title: '해산물',
          desc: '조개류 · 새우 · 게',
          dishes: [
            {
              name: '새우볶음밥',
              recipe: ['밥을 준비한다.', '새우를 볶는다.', '간장으로 간을 맞춘다.'],
              videos: [
                'https://www.youtube.com/watch?v=11lVLe1vnb0',
                'https://www.youtube.com/watch?v=gx7GjyacUJg',
                'https://www.youtube.com/watch?v=kR77WlHRZrs',
              ],
            },
            {
              name: '조개탕',
              recipe: ['조개를 해감한다.', '끓는 물에 조개를 넣는다.', '마늘과 대파로 향을 낸다.'],
              videos: [
                'https://www.youtube.com/watch?v=WwqHQcSFUYI',
                'https://www.youtube.com/watch?v=nsDn24g1_po',
                'https://www.youtube.com/watch?v=H87kEq0yJ1c',
              ],
            },
            {
              name: '게살죽',
              recipe: ['게살을 준비한다.', '쌀을 넣고 죽을 끓인다.', '소금으로 간을 맞춘다.'],
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
              recipe: ['브로콜리를 데친다.', '간장, 마늘, 깨소금으로 무친다.'],
              videos: [
                'https://www.youtube.com/watch?v=nL41mkmg2Qg',
                'https://www.youtube.com/watch?v=flFWnRrOwdU',
                'https://www.youtube.com/watch?v=iidrv1JFutw',
              ],
            },
            {
              name: '시금치나물',
              recipe: ['시금치를 데친다.', '간장과 참기름으로 무친다.'],
              videos: [
                'https://www.youtube.com/watch?v=VD2Pnd78oAg',
                'https://www.youtube.com/watch?v=SkwYtWkF94U',
                'https://www.youtube.com/watch?v=_j-rxiQ-eqc',
              ],
            },
            {
              name: '청경채볶음',
              recipe: ['청경채를 썬다.', '마늘을 볶고 청경채를 넣는다.', '굴소스로 마무리한다.'],
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
              recipe: ['청국장과 두부를 준비한다.', '끓는 물에 넣고 끓인다.', '파와 마늘을 추가한다.'],
              videos: [
                'https://www.youtube.com/watch?v=dSyLbmn0SHM',
                'https://www.youtube.com/watch?v=_EXRrY4amTo',
                'https://www.youtube.com/watch?v=WTPSPd3G_Jk',
              ],
            },
            {
              name: '낫토덮밥',
              recipe: ['밥 위에 낫토를 올린다.', '간장과 김가루를 뿌린다.'],
              videos: [
                'https://www.youtube.com/watch?v=iP1GfcWIVxI',
                'https://www.youtube.com/watch?v=81uMWfe_F24',
                'https://www.youtube.com/watch?v=byXLa3YEHA8',
              ],
            },
            {
              name: '콩국수',
              recipe: ['콩을 갈아 콩국을 만든다.', '면을 삶아 넣고 소금 간을 한다.'],
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
    '태음인': {
      good: [
        {
          title: '소고기',
          desc: '등심 · 안심 · 곰탕',
          dishes: [
            {
              name: '소고기무국',
              recipe: ['무와 소고기를 볶는다.', '물과 간장을 넣고 끓인다.'],
              videos: [
                'https://www.youtube.com/watch?v=vG07DHeNH9c',
                'https://www.youtube.com/watch?v=yDGKUQPVQoc',
                'https://www.youtube.com/watch?v=FKTHO15QutU',
              ],
            },
            {
              name: '불고기',
              recipe: ['소고기를 양념에 재운다.', '양파와 함께 구워낸다.'],
              videos: [
                'https://www.youtube.com/watch?v=p3IQTouKyH0',
                'https://www.youtube.com/watch?v=nVzwOOJLt24',
                'https://www.youtube.com/watch?v=q85dpwLkDgQ',
              ],
            },
            {
              name: '곰탕',
              recipe: ['소뼈를 우려낸다.', '고기와 국물을 함께 담는다.'],
              videos: [
                'https://www.youtube.com/watch?v=VVvXypkGs7U',
                'https://www.youtube.com/watch?v=GIhHySTfma0',
                'https://www.youtube.com/watch?v=Wm7x__kWVVA',
              ],
            },
          ],
        },
        {
          title: '뿌리채소',
          desc: '무 · 도라지 · 우엉',
          dishes: [
            {
              name: '도라지무침',
              recipe: ['도라지를 데친다.', '고춧가루와 마늘로 무친다.'],
              videos: [
                'https://www.youtube.com/watch?v=YoolYU76STY',
                'https://www.youtube.com/watch?v=2vrJR3ZpRf0',
                'https://www.youtube.com/watch?v=iE3qwudcpaE',
              ],
            },
            {
              name: '우엉조림',
              recipe: ['우엉을 볶고 간장양념으로 조린다.'],
              videos: [
                'https://www.youtube.com/watch?v=22HPD7pKfaE',
                'https://www.youtube.com/watch?v=hp5DDGiWvQQ',
                'https://www.youtube.com/watch?v=aG6-KBMEzUM',
              ],
            },
            {
              name: '무생채',
              recipe: ['무를 채썬다.', '식초와 고춧가루로 버무린다.'],
              videos: [
                'https://www.youtube.com/watch?v=dXN1dlsYdJI',
                'https://www.youtube.com/watch?v=2ykS1f_8d2Q',
                'https://www.youtube.com/watch?v=SNimRYX9YaQ',
              ],
            },
          ],
        },
        {
          title: '곡류',
          desc: '율무 · 보리 · 녹두',
          dishes: [
            {
              name: '보리밥',
              recipe: ['보리를 씻어 밥솥에 넣고 밥을 짓는다.'],
              videos: [
                'https://www.youtube.com/watch?v=ECy6tVqdxvI',
                'https://www.youtube.com/watch?v=UAEsEiZng9A',
                'https://www.youtube.com/watch?v=ZT2eLaYPQgg',
              ],
            },
            {
              name: '녹두전',
              recipe: ['녹두를 갈아 반죽을 만든다.', '기름에 지진다.'],
              videos: [
                'https://www.youtube.com/watch?v=c_V7FGDRvqk',
                'https://www.youtube.com/watch?v=JMxOboDXRdc',
                'https://www.youtube.com/watch?v=RNSdQNjOFj0',
              ],
            },
            {
              name: '율무차',
              recipe: ['율무를 볶아 갈고, 뜨거운 물에 우린다.'],
              videos: [
                'https://www.youtube.com/watch?v=QrdEydQKg4k',
                'https://www.youtube.com/watch?v=CrfSqfjpffE',
                'https://www.youtube.com/watch?v=tu_ZzXm5iPg',
              ],
            },
          ],
        },
      ],
      bad: [
        { title: '돼지고기', desc: '삼겹살 · 갈비 · 햄' },
        { title: '기름진 튀김류', desc: '치킨 · 돈까스 · 탕수육' },
        { title: '찬 음식', desc: '수박 · 아이스크림 · 냉면' },
      ],
    },
    '소양인': {
      good: [
        {
          title: '돼지고기',
          desc: '삼겹살 · 갈비 · 햄',
          dishes: [
            { name: '돼지고기두루치기',
              recipe: ['고추장 양념을 준비한다.', '돼지고기를 볶는다.', '야채를 넣어 마무리한다.'],
              videos: [
                'https://www.youtube.com/watch?v=g8QTlr3cY5Q',
                'https://www.youtube.com/watch?v=Vako8rgqK3w',
                'https://www.youtube.com/watch?v=E7tCGvcsN2Y',
              ], },
            { name: '제육볶음',
              recipe: ['돼지고기에 양념장을 넣고 볶는다.', '양파와 대파를 넣는다.'],
              videos: [
                'https://www.youtube.com/watch?v=gWHWUj5AzvU',
                'https://www.youtube.com/watch?v=BzxJM4QdiB0',
                'https://www.youtube.com/watch?v=-jbNz_xUdMk',
              ], },
            { name: '돼지갈비찜',
              recipe: ['돼지갈비를 데친다.', '양념에 넣고 졸인다.'],
              videos: [
                'https://www.youtube.com/watch?v=WT9tCViPddU',
                'https://www.youtube.com/watch?v=hxUqpXTIJ-8',
                'https://www.youtube.com/watch?v=lK68IL48o28',
              ], },
          ],
        },
        {
          title: '찬 성질 채소',
          desc: '오이 · 가지 · 상추',
          dishes: [
            { name: '오이무침', recipe: ['오이를 썬다.', '고춧가루와 식초로 무친다.'] },
            { name: '가지볶음', recipe: ['가지를 썰어 간장양념에 볶는다.'] },
            { name: '상추겉절이', recipe: ['상추를 손질한다.', '양념장을 넣고 버무린다.'] },
          ],
        },
        {
          title: '곡류',
          desc: '율무 · 보리 · 녹두',
          dishes: [
            { name: '율무차', recipe: ['율무를 끓인다.', '소금 간을 맞춘다.'],
              videos: [
                'https://www.youtube.com/watch?v=QrdEydQKg4k',
                'https://www.youtube.com/watch?v=CrfSqfjpffE',
                'https://www.youtube.com/watch?v=tu_ZzXm5iPg',
              ],
             },
            { name: '보리차', recipe: ['보리를 볶아 물에 끓인다.'],
              videos: [
                'https://www.youtube.com/watch?v=urwIXKl-n9w',
                'https://www.youtube.com/watch?v=JFIoMSYDwBU',
                'https://www.youtube.com/watch?v=Vlcfj0IFREQ',
              ],
             },
            { name: '녹두빈대떡', recipe: ['녹두를 갈아 반죽을 만든다.', '기름에 부친다.'],
              videos: [
                'https://www.youtube.com/watch?v=c_V7FGDRvqk&t=5s',
                'https://www.youtube.com/watch?v=-I1JwEby90s',
                'https://www.youtube.com/watch?v=1MGbmMrnjPw',
              ],
             },
          ],
        },
      ],
      bad: [
        { title: '닭고기', desc: '치킨 · 삼계탕' },
        { title: '매운음식', desc: '청양고추 · 매운떡볶이 · 매운라면' },
        { title: '술', desc: '소주 · 맥주 · 막걸리' },
      ],
    },
    '소음인': {
      good: [
        {
          title: '추어탕',
          desc: '미꾸라지탕 · 고추장 양념',
          dishes: [
            {
              name: '추어탕',
              recipe: ['미꾸라지를 끓인다.', '된장을 넣고 끓인다.'],
              videos: [
                'https://www.youtube.com/watch?v=HdWPot6LMGE',
                'https://www.youtube.com/watch?v=2APL67eC3HE&t=365s',
                'https://www.youtube.com/watch?v=g19JzoYXp4Q',
              ],
            },
            {
              name: '추어국수',
              recipe: ['추어탕에 국수를 넣는다.', '간을 맞춘다.'],
              videos: [
                'https://www.youtube.com/watch?v=soqr6u5wAWI',
                'https://www.youtube.com/watch?v=BJ-lXPCZQhk',
                'https://www.youtube.com/watch?v=9813pR4QdP4',
              ],
            },
            {
              name: '미꾸라지튀김',
              recipe: ['미꾸라지를 튀긴다.', '간장소스를 곁들인다.'],
              videos: [
                'https://www.youtube.com/watch?v=PGwJZpD1Z4U',
                'https://www.youtube.com/watch?v=J2UlRhC13SQ',
                'https://www.youtube.com/watch?v=RIadpeDk4a8',
              ],
            },
          ],
        },
        {
          title: '대추',
          desc: '말린 대추 · 대추차',
          dishes: [
            { name: '대추차', recipe: ['대추를 끓인다.', '꿀을 넣는다.'],
              videos: [
                'https://www.youtube.com/watch?v=K8nvf4fKvWM',
                'https://www.youtube.com/watch?v=qjUciVLpIwI',
                'https://www.youtube.com/watch?v=uNqcv5FEB6M',
              ],
             },
            { name: '대추죽', recipe: ['대추를 갈아 쌀과 함께 끓인다.'],
              videos: [
                'https://www.youtube.com/watch?v=zsm-xesq7lY',
                'https://www.youtube.com/watch?v=062zWHwdsmo',
                'https://www.youtube.com/watch?v=v2A2yTkfHmU',
              ],
             },
            { name: '대추편강', recipe: ['대추를 얇게 썰어 졸인다.'],
              videos: [
                'https://www.youtube.com/watch?v=S73jmNXpLFA',
                'https://www.youtube.com/watch?v=PoSR3gqKOmY',
                'https://www.youtube.com/watch?v=F6jRRowH8gU',
              ],
             },
          ],
        },
        {
          title: '생강',
          desc: '생강차 · 편강',
          dishes: [
            { name: '생강차', recipe: ['생강을 끓인다.', '꿀을 넣는다.'],
              videos: [
                'https://www.youtube.com/watch?v=p0qzKpLME6A',
                'https://www.youtube.com/watch?v=bN3o0B7TaiE',
                'https://www.youtube.com/watch?v=VOeE_NB6knQ',
              ],
             },
            { name: '편강', recipe: ['생강을 졸인다.', '설탕을 뿌린다.'],
              videos: [
                'https://www.youtube.com/watch?v=S73jmNXpLFA',
                'https://www.youtube.com/watch?v=PoSR3gqKOmY',
                'https://www.youtube.com/watch?v=F6jRRowH8gU',
              ],
             },
            { name: '생강청', recipe: ['생강을 다져 설탕에 절인다.'],
              videos: [
                'https://www.youtube.com/watch?v=A4lYJ0vxHzQ',
                'https://www.youtube.com/watch?v=rxMNoZO74YU',
                'https://www.youtube.com/watch?v=jWYVDeDbjes',
              ],
             },
          ],
        },
      ],
      bad: [
        { title: '돼지고기', desc: '삼겹살 · 갈비 · 햄' },
        { title: '찬 음식', desc: '수박 · 아이스크림 · 냉면' },
        { title: '찬 성질 채소', desc: '오이 · 가지 · 상추' },
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

        {/* 좋은 음식 */}
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

            {/* 안좋은 음식 */}
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

        {/* 재료 클릭 시 음식 목록 */}
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

        {/* 레시피 보기 */}
        {selectedDish && (
          <div className="food-section">
            <h2 className="good-title">🍽️ {selectedDish.name} 레시피</h2>
            <img
              src={`/recommend/food/${prefix}_dish_${selectedDish.index}.png`}
              alt={selectedDish.name}
              className="recipe-image"
              onError={(e) => (e.target.style.display = 'none')}
            />
            <ul className="recipe-list">
              {selectedDish.recipe.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>

            {/* ✅ 유튜브 영상 3개 */}
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

        {/* 결과 페이지로 돌아가기 */}
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
