import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CheckEmail() {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState("Đang xác thực...");
  
    useEffect(() => {
      const token = searchParams.get("token");
      fetch(`http://localhost:8080/api/auth/verify-email?token=${token}`)
        .then((res) => res.text())
        .then(setMessage)
        .catch(() => setMessage("Lỗi xác thực!"));
    }, [searchParams]);
  
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold">{message}</h2>
      </div>
    );
  }
  