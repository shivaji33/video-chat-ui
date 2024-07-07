import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const nameInputRef = useRef();
  const hostNameInputRef = useRef();

  const onJoinMeet = () => {
    const roomId = inputRef.current?.value;
    const name = nameInputRef.current?.value;
    if (!name || !roomId) {
      alert("Please enter valid meeting id and name!");
      return;
    }
    navigate(`/${roomId}/${name}`);
  };

  const onCreateRoom = () => {
    const hostName = hostNameInputRef.current?.value;
    if (!hostName) {
      alert("Please enter host name");
      return;
    }
    const uuid = self.crypto.randomUUID();
    navigate(`/${uuid}/${hostName}`);
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-mayabazar">
      <div className="flex flex-col m-auto w-[400px] border rounded shadow-md bg-white p-3">
        <h1
          className="text-2xl mt-3 mb-5 text-blue-700 text-center font-bold"
          title="Mayabazar"
        >
          Welcome to <span className="invert"><span>B</span><span>o</span><span>o</span><span>m</span></span> meet!
        </h1>
        <label className="mb-2" htmlFor="roomId">
          Enter meeting ID
        </label>
        <input ref={inputRef} type="text" id="roomId" autoComplete="off" />
        <label className="mb-2" htmlFor="name">
          Enter Name
        </label>
        <input ref={nameInputRef} type="text" id="name" autoComplete="off" />
        <button className="action-btn" onClick={onJoinMeet}>Join</button>
        <h1 className="text-lg mt-4 text-center font-bold">OR</h1>
        <label className="mb-2" htmlFor="name">
          Enter Host Name
        </label>
        <input
          ref={hostNameInputRef}
          type="text"
          id="name"
          autoComplete="off"
        />
        <button className="action-btn" onClick={onCreateRoom}>Host meeting</button>
      </div>
    </div>
  );
};

export default Home;
