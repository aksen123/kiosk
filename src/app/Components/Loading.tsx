import Lottie from "react-lottie-player";
import loading from "@/../public/loading.json";
const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Lottie
        loop
        animationData={loading}
        play
        style={{ width: 350, height: 350 }}
      />
    </div>
  );
};

export default Loading;
