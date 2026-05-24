import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import loginUser from "../../services/loginService";
import "./LoginModal.css";
import registerUser from "../../services/userService";

interface LoginModalProps {
    onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
    const { login } = useAuth();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [createAccountFirstName, setCreateAccountFirstName] = useState("");
    const [createAccountLastName, setCreateAccountLastName] = useState("");
    const [createAccountEmail, setCreateAccountEmail] = useState("");
    const [createAccountPassword, setCreateAccountPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            setError("");
            const response = await loginUser({ email: loginEmail, password: loginPassword });
            login(response.token!);
            onClose();
        } catch {
            setError("Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateAccount = async () => {
        try {
         setIsLoading(true);
         setError("");
         const response = await registerUser({ firstName: createAccountFirstName, lastName: createAccountLastName, email: createAccountEmail, password: createAccountPassword });
         if (response.success) {
            setMessage("Account created successfully! You can now log in.");
            setIsCreatingAccount(false);
         } else {
            setError(response.message || "Failed to create account");
            }
        } catch {
            setError("An error occurred while creating the account");
        }
    };

    useEffect(() => {
        setLoginPassword("");
        setLoginEmail("");
        setError("");
        setCreateAccountEmail("");
        setCreateAccountPassword("");
        setIsLoading(false);

    }, [isCreatingAccount]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                {!isCreatingAccount && (
                    <>
                    <h3>Login to Auctioneer</h3>
                    <p className="switch-mode" >
                        Don't have an account? <span className="sign-up-span" onClick={() => setIsCreatingAccount(true)}>Sign up instead</span>
                    </p>
                    {message && <p className="message">{message}</p>}
                    <input type="text" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                    {error && <p className="error">{error}</p>}
                    <div className="modal-actions">
                        <button onClick={handleLogin} disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                    </>
                )}
                {isCreatingAccount && (
                    <>
                    <h3>Create Account</h3>
                    <p className="switch-mode" >
                        Already have an account? <span className="sign-up-span" onClick={() => setIsCreatingAccount(false)}>Login instead</span>
                    </p>
                    {message && <p className="message">{message}</p>}
                    <input type="text" placeholder="First name" value={createAccountFirstName} onChange={(e) => setCreateAccountFirstName(e.target.value)} />
                    <input type="text" placeholder="Last name" value={createAccountLastName} onChange={(e) => setCreateAccountLastName(e.target.value)} />
                    <input type="text" placeholder="Email" value={createAccountEmail} onChange={(e) => setCreateAccountEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={createAccountPassword} onChange={(e) => setCreateAccountPassword(e.target.value)} />
                    {error && <p className="error">{error}</p>}
                    <div className="modal-actions">
                        <button onClick={handleCreateAccount} disabled={isLoading}>
                            {isLoading ? "Creating account..." : "Create account"}
                        </button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                    </>
                )}
                
            </div>
        </div>
    );
};

export default LoginModal;