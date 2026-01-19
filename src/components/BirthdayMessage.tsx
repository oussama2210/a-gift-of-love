import { motion } from "framer-motion";
import { Heart, Cake, Gift, Star } from "lucide-react";

const BirthdayMessage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const heartVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        delay: 2,
      },
    },
  };

  return (
    <motion.div
      className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Decorative icons */}
      <motion.div
        className="absolute top-20 right-10 md:right-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Star size={40} className="text-accent fill-accent" />
      </motion.div>
      
      <motion.div
        className="absolute top-32 left-10 md:left-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Gift size={36} className="text-primary" />
      </motion.div>

      {/* Cake Icon */}
      <motion.div
        variants={itemVariants}
        className="mb-8"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Cake size={80} className="text-accent" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        variants={itemVariants}
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-glow gradient-text text-center mb-6"
      >
        عيد ميلاد سعيد
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground/90 text-center mb-8"
      >
        يا أجمل إنسانة في حياتي
      </motion.p>

      {/* Love Message */}
      <motion.div
        variants={itemVariants}
        className="max-w-2xl mx-auto text-center mb-10"
      >
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          في يومك الخاص، أريدك أن تعرفي أنك أجمل هدية منحتني إياها الحياة.
          <br />
          كل يوم معك هو احتفال، وكل لحظة بجانبك هي نعمة.
        </p>
      </motion.div>

      {/* Glowing Heart */}
      <motion.div
        variants={heartVariants}
        className="relative"
      >
        <motion.div
          className="absolute inset-0 blur-2xl bg-primary/40 rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart
            size={120}
            className="text-primary fill-primary relative z-10"
            strokeWidth={1}
          />
        </motion.div>
      </motion.div>

      {/* Love Declaration */}
      <motion.div
        variants={itemVariants}
        className="mt-10"
      >
        <motion.p
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-glow-gold gradient-text-gold"
          animate={{ 
            textShadow: [
              "0 0 20px hsl(45 90% 60% / 0.6)",
              "0 0 40px hsl(45 90% 60% / 0.8)",
              "0 0 20px hsl(45 90% 60% / 0.6)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          أحبك إلى الأبد 💕
        </motion.p>
      </motion.div>

      {/* Wishes */}
      <motion.div
        variants={itemVariants}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl"
      >
        {[
          { icon: Heart, text: "حب لا ينتهي" },
          { icon: Star, text: "سعادة دائمة" },
          { icon: Gift, text: "أحلام تتحقق" },
        ].map((wish, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20"
            whileHover={{ scale: 1.05, borderColor: "hsl(340 80% 60%)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <wish.icon size={32} className="text-primary" />
            <span className="text-lg font-medium text-foreground">{wish.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BirthdayMessage;
