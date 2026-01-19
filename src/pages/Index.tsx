import FloatingHearts from "@/components/FloatingHearts";
import Confetti from "@/components/Confetti";
import SparkleEffect from "@/components/SparkleEffect";
import BirthdayMessage from "@/components/BirthdayMessage";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-secondary/20 z-0" />
      
      {/* Animated elements */}
      <FloatingHearts />
      <Confetti />
      <SparkleEffect />
      
      {/* Main content */}
      <BirthdayMessage />
    </div>
  );
};

export default Index;
