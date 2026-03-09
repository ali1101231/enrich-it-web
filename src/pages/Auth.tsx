import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp && password.length < 6) {
      toast({ title: "Password too short", description: "Must be at least 6 characters", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isSignUp) {
        toast({ title: "Account created!", description: "You can now sign in." });
        setIsSignUp(false);
        setEmail("");
        setPassword("");
        setName("");
      } else {
        toast({ title: "Welcome back!" });
        navigate("/");
      }
    }, 800);
  };

  const toggle = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(250 70% 68%))" }}
    >
      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-20 h-20 rounded-full"
          style={{ background: "rgba(255,255,255,0.08)", top: "10%", left: "10%" }}
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-32 h-32 rounded-full"
          style={{ background: "rgba(255,255,255,0.06)", top: "70%", right: "10%" }}
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute w-16 h-16 rounded-full"
          style={{ background: "rgba(255,255,255,0.07)", top: "40%", left: "80%" }}
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-[850px] h-[550px] rounded-3xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 45px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        {/* Sign In Form */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center z-[2] max-md:w-full"
          animate={{
            x: isSignUp ? "100%" : "0%",
            opacity: isSignUp ? 0 : 1,
          }}
          transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="w-[320px] p-10 rounded-2xl max-md:w-[280px]"
            style={{
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
            key="signin-form"
          >
            <h1 className="text-2xl font-bold font-display text-foreground text-center mb-1 relative pb-4">
              Welcome Back
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-[3px] rounded-full gradient-primary" />
            </h1>

            <div className="space-y-4 mt-6">
              <div className="space-y-1.5">
                <Label htmlFor="si-email" className="text-foreground/80 text-xs font-medium">Email</Label>
                <Input
                  id="si-email"
                  type="email"
                  placeholder="you@company.com"
                  value={!isSignUp ? email : ""}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 rounded-xl border-2 border-border bg-card/80 focus:border-primary transition-all text-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="si-password" className="text-foreground/80 text-xs font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="si-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={!isSignUp ? password : ""}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 rounded-xl border-2 border-border bg-card/80 focus:border-primary transition-all text-foreground pr-10"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || isSignUp}
              className="w-full mt-6 h-11 rounded-xl gradient-primary text-primary-foreground font-semibold hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              {loading && !isSignUp ? "Signing in…" : "Sign In"}
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-4">
              <a href="#" className="text-primary hover:underline">Forgot your password?</a>
            </p>

            {/* Mobile toggle */}
            <div className="md:hidden mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Don't have an account?</p>
              <button type="button" onClick={toggle} className="text-primary font-semibold text-sm hover:underline">
                Sign Up
              </button>
            </div>
          </motion.form>
        </motion.div>

        {/* Sign Up Form */}
        <motion.div
          className="absolute top-0 left-1/2 w-1/2 h-full flex items-center justify-center z-[1] max-md:w-full max-md:left-0"
          animate={{
            x: isSignUp ? "-100%" : "0%",
            opacity: isSignUp ? 1 : 0,
            zIndex: isSignUp ? 5 : 1,
          }}
          transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="w-[320px] p-10 rounded-2xl max-md:w-[280px]"
            style={{
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
            key="signup-form"
          >
            <h1 className="text-2xl font-bold font-display text-foreground text-center mb-1 relative pb-4">
              Create Account
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-[3px] rounded-full gradient-primary" />
            </h1>

            <div className="space-y-4 mt-6">
              <div className="space-y-1.5">
                <Label htmlFor="su-name" className="text-foreground/80 text-xs font-medium">Full Name</Label>
                <Input
                  id="su-name"
                  type="text"
                  placeholder="John Doe"
                  value={isSignUp ? name : ""}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11 rounded-xl border-2 border-border bg-card/80 focus:border-primary transition-all text-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="su-email" className="text-foreground/80 text-xs font-medium">Email</Label>
                <Input
                  id="su-email"
                  type="email"
                  placeholder="you@company.com"
                  value={isSignUp ? email : ""}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 rounded-xl border-2 border-border bg-card/80 focus:border-primary transition-all text-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="su-password" className="text-foreground/80 text-xs font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="su-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={isSignUp ? password : ""}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="h-11 rounded-xl border-2 border-border bg-card/80 focus:border-primary transition-all text-foreground pr-10"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !isSignUp}
              className="w-full mt-6 h-11 rounded-xl gradient-primary text-primary-foreground font-semibold hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              {loading && isSignUp ? "Creating account…" : "Sign Up"}
            </Button>

            {/* Mobile toggle */}
            <div className="md:hidden mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Already have an account?</p>
              <button type="button" onClick={toggle} className="text-primary font-semibold text-sm hover:underline">
                Sign In
              </button>
            </div>
          </motion.form>
        </motion.div>

        {/* Overlay sliding panel */}
        <motion.div
          className="absolute top-0 left-1/2 w-1/2 h-full z-[100] overflow-hidden max-md:hidden"
          animate={{ x: isSignUp ? "-100%" : "0%" }}
          transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
        >
          <motion.div
            className="relative h-full w-[200%] left-[-100%] gradient-primary"
            animate={{ x: isSignUp ? "50%" : "0%" }}
            transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
          >
            {/* Overlay Left - shown when sign up is active */}
            <motion.div
              className="absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center text-center px-10"
              animate={{ x: isSignUp ? "0%" : "-20%" }}
              transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <h2 className="text-3xl font-extrabold font-display text-primary-foreground tracking-tight mb-4"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
              >
                Welcome Back!
              </h2>
              <p className="text-primary-foreground/80 text-base leading-relaxed mb-8">
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={toggle}
                className="px-8 py-2.5 rounded-xl border-2 border-primary-foreground/40 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                Sign In
              </button>
            </motion.div>

            {/* Overlay Right - shown when sign in is active */}
            <motion.div
              className="absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center text-center px-10"
              animate={{ x: isSignUp ? "20%" : "0%" }}
              transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <h2 className="text-3xl font-extrabold font-display text-primary-foreground tracking-tight mb-4"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
              >
                Hello, Friend!
              </h2>
              <p className="text-primary-foreground/80 text-base leading-relaxed mb-8">
                Enter your personal details and start your journey with us
              </p>
              <button
                onClick={toggle}
                className="px-8 py-2.5 rounded-xl border-2 border-primary-foreground/40 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                Sign Up
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Back to home link */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-primary-foreground/70 hover:text-primary-foreground text-sm font-medium transition-colors flex items-center gap-1.5"
      >
        ← Back to home
      </Link>
    </div>
  );
};

export default Auth;
