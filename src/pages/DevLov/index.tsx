import { CardContainer, DevLovContainer } from "./style";
import logo from "../../assets/logo.png";
import x from "../../assets/xdevlov.png";
import heart from "../../assets/heart.png";
import { AiFillInfoCircle } from "react-icons/ai";
import ButtonBack from "../../components/ButtonBack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

type IFrindList = Omit<IUsers, "password">;

interface IUsers {
  age: number;
  bio: string;
  city: string;
  email: string;
  friendList?: IFrindList[];
  gender: string;
  id: number;
  name: string;
  password: string;
  state: string;
  url_avatar: string;
}

const DevLov = () => {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [count, setCount] = useState(0);
  const [isChange, setIsChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("users")
      .then(({ data }) => {
        setUsers(data);
      })
      .catch(err => console.error(err));
  }, []);

  const functionNext = () => {
    if (count === users.length - 1) {
    } else {
      setIsChange(true);
      setTimeout(() => {
        setIsChange(true);
      }, 1000);
      setCount((oldCount: number) => oldCount + 1);
    }
  };

  return (
    <DevLovContainer>
      <div className="header__devlov">
        <img src={logo} alt="" />
        <ButtonBack onClick={() => navigate("/home")} />
      </div>
      {users.length > 0 ? (
        <CardContainer isChange={isChange}>
          <li>
            <div>
              <img
                className="AvatarImage"
                src={users[count].url_avatar}
                alt=""
              />
              <div className="nameAndinfo">
                <span>{users[count].name}</span>
                <AiFillInfoCircle onClick={() => navigate("/profile")} />
              </div>
              <div className="button__container">
                <button>
                  <img onClick={functionNext} src={x} alt="" />
                </button>
                <button>
                  <img onClick={functionNext} src={heart} alt="" />
                </button>
              </div>
            </div>
          </li>
        </CardContainer>
      ) : (
        <></>
      )}
    </DevLovContainer>
  );
};

export default DevLov;