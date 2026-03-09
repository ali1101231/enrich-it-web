import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cubicBezier: any = [0.68, -0.55, 0.265, 1.55];

const Auth = () => {
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(location.pathname === "/sign-up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Welcome back!" });
      navigate("/");
    }, 800);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "Password too short", description: "Must be at least 6 characters", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Account created!" });
      setIsSignUp(false);
      setEmail(""); setPassword(""); setName("");
    }, 800);
  };

  const toggle = () => {
    setIsSignUp(!isSignUp);
    setEmail(""); setPassword(""); setName(""); setShowPassword(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(250 70% 68%))" }}
    >
      {/* Floating shapes */}
      <motion.div className="absolute w-20 h-20 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.08)", top: "10%", left: "10%" }} animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute w-32 h-32 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.06)", top: "70%", right: "10%" }} animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      <motion.div className="absolute w-16 h-16 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.07)", top: "40%", left: "80%" }} animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }} />

      {/* Main container — mirrors the original HTML structure exactly */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-[850px] h-[550px] rounded-3xl overflow-hidden max-md:h-auto max-md:min-h-[500px]"
        style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 45px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        {/* SIGN IN form container — starts at left:0 */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center max-md:relative max-md:w-full max-md:h-auto max-md:py-8"
          animate={{
            x: isSignUp ? "100%" : "0%",
          }}
          transition={{ duration: 0.8, ease: cubicBezier }}
          style={{ zIndex: 2 }}
        >
          <motion.form
            onSubmit={handleSignIn}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-[320px] p-10 rounded-2xl max-md:w-[280px]"
            style={{
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            <h1 className="text-[28px] font-bold font-display text-foreground text-center mb-1 relative pb-4">
              Welcome Back
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60px] h-[3px] rounded-full gradient-primary" />
            </h1>
            <div className="space-y-5 mt-7">
              <div>
                <Input type="email" placeholder="Email" value={!isSignUp ? email : ""} onChange={(e) => setEmail(e.target.value)} required={!isSignUp}
                  className="h-[50px] rounded-xl border-2 border-[#e1e5e9] bg-white/80 text-foreground text-base px-5 focus:border-primary focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] focus:-translate-y-0.5 transition-all placeholder:text-muted-foreground/60" />
              </div>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Password" value={!isSignUp ? password : ""} onChange={(e) => setPassword(e.target.value)} required={!isSignUp}
                  className="h-[50px] rounded-xl border-2 border-[#e1e5e9] bg-white/80 text-foreground text-base px-5 pr-11 focus:border-primary focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] focus:-translate-y-0.5 transition-all placeholder:text-muted-foreground/60" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <p className="text-center mt-4"><a href="#" className="text-primary text-sm hover:underline">Forgot your password?</a></p>
            <button type="submit" disabled={loading}
              className="w-full mt-4 h-[50px] rounded-xl text-base font-semibold text-primary-foreground gradient-primary hover:-translate-y-[3px] hover:shadow-[0_10px_25px_rgba(102,126,234,0.4)] transition-all duration-300 disabled:opacity-60 relative overflow-hidden"
            >
              {loading && !isSignUp ? "Signing in…" : "Sign In"}
            </button>
            <div className="md:hidden mt-5 text-center">
              <p className="text-sm text-muted-foreground">Don't have an account?</p>
              <button type="button" onClick={toggle} className="text-primary font-semibold text-sm hover:underline mt-1">Sign Up</button>
            </div>
          </motion.form>
        </motion.div>

        {/* SIGN UP form container — starts at left:50% */}
        <motion.div
          className="absolute top-0 left-1/2 w-1/2 h-full flex items-center justify-center max-md:relative max-md:w-full max-md:left-0 max-md:h-auto max-md:py-8"
          animate={{
            x: isSignUp ? "-100%" : "0%",
            opacity: isSignUp ? 1 : 0,
            zIndex: isSignUp ? 5 : 1,
          }}
          transition={{ duration: 0.8, ease: cubicBezier }}
        >
          <form
            onSubmit={handleSignUp}
            className="w-[320px] p-10 rounded-2xl max-md:w-[280px]"
            style={{
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            <h1 className="text-[28px] font-bold font-display text-foreground text-center mb-1 relative pb-4">
              Create Account
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60px] h-[3px] rounded-full gradient-primary" />
            </h1>
            <div className="space-y-4 mt-7">
              <Input type="text" placeholder="Name" value={isSignUp ? name : ""} onChange={(e) => setName(e.target.value)} required={isSignUp}
                className="h-[50px] rounded-xl border-2 border-[#e1e5e9] bg-white/80 text-foreground text-base px-5 focus:border-primary focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] focus:-translate-y-0.5 transition-all placeholder:text-muted-foreground/60" />
              <Input type="email" placeholder="Email" value={isSignUp ? email : ""} onChange={(e) => setEmail(e.target.value)} required={isSignUp}
                className="h-[50px] rounded-xl border-2 border-[#e1e5e9] bg-white/80 text-foreground text-base px-5 focus:border-primary focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] focus:-translate-y-0.5 transition-all placeholder:text-muted-foreground/60" />
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Password" value={isSignUp ? password : ""} onChange={(e) => setPassword(e.target.value)} required={isSignUp} minLength={6}
                  className="h-[50px] rounded-xl border-2 border-[#e1e5e9] bg-white/80 text-foreground text-base px-5 pr-11 focus:border-primary focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] focus:-translate-y-0.5 transition-all placeholder:text-muted-foreground/60" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full mt-5 h-[50px] rounded-xl text-base font-semibold text-primary-foreground gradient-primary hover:-translate-y-[3px] hover:shadow-[0_10px_25px_rgba(102,126,234,0.4)] transition-all duration-300 disabled:opacity-60 relative overflow-hidden"
            >
              {loading && isSignUp ? "Creating account…" : "Sign Up"}
            </button>
            <div className="md:hidden mt-5 text-center">
              <p className="text-sm text-muted-foreground">Already have an account?</p>
              <button type="button" onClick={toggle} className="text-primary font-semibold text-sm hover:underline mt-1">Sign In</button>
            </div>
          </form>
        </motion.div>

        {/* OVERLAY CONTAINER — starts at left:50%, slides to left:0 on sign up */}
        <motion.div
          className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-[100] max-md:hidden"
          animate={{ x: isSignUp ? "-100%" : "0%" }}
          transition={{ duration: 0.8, ease: cubicBezier }}
        >
          {/* Inner overlay — double width, slides within */}
          <motion.div
            className="relative h-full gradient-primary"
            style={{ width: "200%", left: "-100%" }}
            animate={{ x: isSignUp ? "50%" : "0%" }}
            transition={{ duration: 0.8, ease: cubicBezier }}
          >
            {/* LEFT overlay panel — "Welcome Back!" */}
            <motion.div
              className="absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center text-center px-10"
              animate={{ x: isSignUp ? "0%" : "-20%" }}
              transition={{ duration: 0.8, ease: cubicBezier }}
            >
              <h2 className="text-4xl font-extrabold font-display text-primary-foreground tracking-tight mb-5" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
                Welcome Back!
              </h2>
              <p className="text-primary-foreground/90 text-lg leading-relaxed mb-8">
                To keep connected with us please login with your personal info
              </p>
              <button onClick={toggle}
                className="px-10 py-3 rounded-xl border-2 border-primary-foreground/40 text-primary-foreground font-semibold text-base hover:bg-primary-foreground/10 hover:-translate-y-0.5 transition-all duration-300">
                Sign In
              </button>
            </motion.div>

            {/* RIGHT overlay panel — "Hello, Friend!" */}
            <motion.div
              className="absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center text-center px-10"
              animate={{ x: isSignUp ? "20%" : "0%" }}
              transition={{ duration: 0.8, ease: cubicBezier }}
            >
              <h2 className="text-4xl font-extrabold font-display text-primary-foreground tracking-tight mb-5" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
                Hello, Friend!
              </h2>
              <p className="text-primary-foreground/90 text-lg leading-relaxed mb-8">
                Enter your personal details and start your journey with us
              </p>
              <button onClick={toggle}
                className="px-10 py-3 rounded-xl border-2 border-primary-foreground/40 text-primary-foreground font-semibold text-base hover:bg-primary-foreground/10 hover:-translate-y-0.5 transition-all duration-300">
                Sign Up
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Back to home */}
      <Link to="/" className="absolute top-6 left-6 text-primary-foreground/70 hover:text-primary-foreground text-sm font-medium transition-colors">
        ← Back to home
      </Link>
    </div>
  );
};

export default Auth;
