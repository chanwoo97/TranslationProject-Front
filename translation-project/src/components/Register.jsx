// Register.js 또는 SignUpForm.js

import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const validateForm = () => {
        let newErrors = {};
        if (!form.username) newErrors.username = "아이디를 입력해주세요.";

        if (!form.email) newErrors.email = "이메일을 입력해주세요.";
        else if (!/\S+@\S+\.\S+/.test(form.email))
            newErrors.email = "올바른 이메일 형식이 아닙니다.";

        if (!form.password) newErrors.password = "비밀번호를 입력해주세요.";
        else if (form.password.length < 6)
            newErrors.password = "비밀번호는 6자 이상이어야 합니다.";

        if (!form.passwordConfirm) newErrors.passwordConfirm = "비밀번호를 다시 한번 입력해주세요.";
        else if (form.password !== form.passwordConfirm)
            newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const response = await fetch('http://localhost:8080/member/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberId: form.username,
                    password: form.password,
                    email: form.email,
                }),
            });

            if (response.ok) {
                setModalMessage("회원가입이 성공적으로 완료되었습니다.");
                setShowSuccessModal(true);
            } else {
                const errorText = await response.text();
                setErrors({ general: `회원가입 실패: ${errorText}` });
            }
        } catch (error) {
            console.error("네트워크 오류:", error);
            setErrors({ general: "네트워크 오류가 발생했습니다. 다시 시도해주세요." });
        } finally {
            setIsLoading(false);
        }
    };

    const handleModalConfirm = () => {
        setShowSuccessModal(false);
        navigate('/login');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Create Your Account</h2>
                <p className="login-subtitle">정보를 입력하여 계정을 만드세요.</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="text"
                            name="username"
                            placeholder="아이디"
                            value={form.username}
                            onChange={handleChange}
                            className={errors.username ? "input error" : "input"}
                        />
                    </div>
                    {errors.username && <p className="error-text">{errors.username}</p>}

                    <div className="input-group">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="email"
                            name="email"
                            placeholder="이메일"
                            value={form.email}
                            onChange={handleChange}
                            className={errors.email ? "input error" : "input"}
                        />
                    </div>
                    {errors.email && <p className="error-text">{errors.email}</p>}

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            name="password"
                            placeholder="비밀번호"
                            value={form.password}
                            onChange={handleChange}
                            className={errors.password ? "input error" : "input"}
                        />
                    </div>
                    {errors.password && <p className="error-text">{errors.password}</p>}

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            name="passwordConfirm"
                            placeholder="비밀번호 확인"
                            value={form.passwordConfirm}
                            onChange={handleChange}
                            className={errors.passwordConfirm ? "input error" : "input"}
                        />
                    </div>
                    {errors.passwordConfirm && <p className="error-text">{errors.passwordConfirm}</p>}

                    {errors.general && <p className="error-text">{errors.general}</p>}

                    <button type="submit" className="login-btn" disabled={isLoading}>
                        {isLoading ? <FaSpinner className="spinner" /> : "회원가입"}
                    </button>
                </form>

                <p className="signup-text">
                    이미 계정이 있으신가요?{" "}
                    <a href="/login" className="signup-link">
                        로그인
                    </a>
                </p>
            </div>

            {showSuccessModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>알림</h3>
                        <p>{modalMessage}</p>
                        <button onClick={handleModalConfirm} className="modal-button">
                            확인
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;