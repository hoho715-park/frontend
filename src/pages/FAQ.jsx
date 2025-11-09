import React, { useState } from "react";
import "./FAQ.css";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const faqData = [
    {
      question: "이음 서비스는 무엇인가요?",
      answer:
        "이음(IEUM)은 개인의 체질과 생활 패턴을 분석해 맞춤형 건강 관리 솔루션을 제공하는 플랫폼입니다.",
    },
    {
      question: "체질 테스트는 어떻게 진행되나요?",
      answer:
        "이음의 체질 테스트는 QSCC-II 설문과 생체전류 분석을 함께 활용하여 진행됩니다. 문항에 대한 응답을 통해 사용자의 성향과 체질적 특성을 파악하고, 생체전류 데이터를 통해 신체의 전기적 반응 패턴을 측정하여 보다 정확한 사상체질을 진단합니다.",
    },
    {
      question: "결과는 어디서 확인할 수 있나요?",
      answer:
        "테스트 완료 후 결과 페이지에서 바로 확인할 수 있으며, 마이페이지에서도 이전 결과를 볼 수 있습니다.",
    },
    {
      question: "문의사항은 어디로 보낼 수 있나요?",
      answer:
        "FAQ에 없는 질문은 하단의 '글쓰기' 버튼을 눌러 직접 문의를 남기실 수 있습니다.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("문의 접수:", formData);
    alert("문의가 정상적으로 접수되었습니다!");
    setIsModalOpen(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">자주 묻는 질문</h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "active" : ""}`}
          >
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="faq-toggle">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      {/* 글쓰기 버튼 */}
      <div className="faq-write-section">
        <button className="faq-write-btn" onClick={() => setIsModalOpen(true)}>
          글쓰기
        </button>
      </div>

      {/* 문의 팝업 모달 */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* X 닫기 버튼 */}
            <button
              className="modal-close-btn"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>

            <h3>문의사항 작성</h3>
            <form onSubmit={handleSubmit} className="modal-form">
              <label>이름</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label>이메일</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label>문의 내용</label>
              <textarea
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <div className="modal-buttons">
                <button type="submit" className="submit-btn">
                  제출하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FAQ;
