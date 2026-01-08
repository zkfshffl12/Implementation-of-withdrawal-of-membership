import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:8080/api/soju';

function App() {
  const [sojuList, setSojuList] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    alcohol: ''
  });

  // 소주 목록 조회
  const fetchSojuList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/list`);
      setSojuList(response.data);
    } catch (error) {
      console.error('소주 목록 조회 실패:', error);
      alert('소주 목록을 불러오는데 실패했습니다.');
    }
  };

  // 컴포넌트 마운트 시 목록 조회
  useEffect(() => {
    fetchSojuList();
  }, []);

  // 폼 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 소주 등록
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.brand || !formData.alcohol) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/add`, {
        name: formData.name,
        brand: formData.brand,
        alcohol: parseFloat(formData.alcohol)
      });
      
      alert('소주 등록 성공!');
      setFormData({ name: '', brand: '', alcohol: '' });
      fetchSojuList(); // 목록 갱신
    } catch (error) {
      console.error('소주 등록 실패:', error);
      alert('소주 등록에 실패했습니다.');
    }
  };

  // 소주 삭제
  const handleDelete = async (name) => {
    if (!window.confirm(`'${name}' 소주를 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/delete/${name}`);
      alert('삭제 성공!');
      fetchSojuList(); // 목록 갱신
    } catch (error) {
      console.error('소주 삭제 실패:', error);
      alert('소주 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="container">
      <h1>전국 소주 관리 시스템</h1>
      
      {/* 소주 등록 폼 */}
      <div className="form-section">
        <h2>소주 정보 등록</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="소주 이름"
            />
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="브랜드"
            />
            <input
              type="number"
              name="alcohol"
              value={formData.alcohol}
              onChange={handleChange}
              placeholder="알코올 도수 (%)"
              step="0.1"
            />
            <button type="submit">등록</button>
          </div>
        </form>
      </div>

      {/* 소주 목록 */}
      <div className="list-section">
        <h2>소주 목록</h2>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>브랜드</th>
              <th>알코올 도수 (%)</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {sojuList.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  등록된 소주가 없습니다.
                </td>
              </tr>
            ) : (
              sojuList.map((soju) => (
                <tr key={soju.id}>
                  <td>{soju.name}</td>
                  <td>{soju.brand}</td>
                  <td>{soju.alcohol}</td>
                  <td>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(soju.name)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
