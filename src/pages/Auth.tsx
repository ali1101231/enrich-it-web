import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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
      toast({ title: "Account created!", description: "You can now sign in." });
      setIsSignUp(false);
      setEmail("");
      setPassword("");
      setName("");
    }, 800);
  };

  const toggle = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setName("");
    setShowPassword(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(250 70% 68%))" }}
    >
      {/* Floating shapes */}
      <motion.div
        className="absolute w-20 h-20 rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.08)", top: "10%", left: "8%" }}
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-32 h-32 rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.06)", bottom: "10%", right: "8%" }}
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute w-16 h-16 rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.07)", top: "40%", right: "15%" }}
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-[850px] min-h-[520px] rounded-3xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 45px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        {/* ===== SIGN IN FORM (left side, visible when !isSignUp) ===== */}
        <div
          className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center transition-all duration-700 max-md:w-full max-md:relative max-md:h-auto max-md:py-8"
          style={{
            transform: isSignUp ? "translateX(-100%)" : "translateX(0)",
            opacity: isSignUp ? 0 : 1,
            zIndex: isSignUp ? 1 : 2,
            pointerEvents: isSignUp ? "none" : "auto",
          }}
        >
          <form
            onSubmit={handleSignIn}
            className="w-[300px] p-8 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            <h1 className="text-2xl font-bold font-display text-foreground text-center mb-1 relative pb-4">
              Welcome Back
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-[3px] rounded-full gradient-primary" />
            </h1>

            <div className="space-y-4 mt-6">
              <div className="space-y-1.5">
                <Label className="text-foreground/80 text-xs font-medium">Email</Label>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={!isSignUp ? email : ""}
                  onChange={(e) => setEmail(e.target.value)}
                  required={!isSignUp}
                  className="h-11 rounded-xl border-2 border-border bg-card/80 focus:border-primary transition-all text-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-foreground/80 text-xs font-medium">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={!isSignUp ? password : ""}
                    onChange={(e) => setPassword(e.target.value)}
                    required={!isSignUp}
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
              disabled={loading}
              className="w-full mt-6 h-11 rounded-xl gradient-primary text-primary-foreground font-semibold hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              {loading && !isSignUp ? "Signing in…" : "Sign In"}
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-4">
              <a href="#" className="text-primary hover:underline">Forgot your password?</a>
            </p>

            <div className="md:hidden mt-5 text-center">
              <p className="text-sm text-muted-foreground">Don't have an account?</p>
              <button type="button" onClick={toggle} className="text-primary font-semibold text-sm hover:underline mt-1">Sign Up</button>
            </div>
          </form>
        </div>

        {/* ===== SIGN UP FORM (right side, visible when isSignUp) ===== */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full flex items-center justify-center transition-all duration-700 max-md:w-full max-md:relative max-md:h-auto max-md:py-8"
          style={{
            transform: isSignUp ? "translateX(0)" : "translateX(100%)",
            opacity: isSignUp ? 1 : 0,
            zIndex: isSignUp ? 5 : 1,
            pointerEvents: isSignUp ? "auto" : "none",
          }}
        >
          <form
            onSubmit={handleSignUp}
            className="w-[300px] p-8 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            <h1 className="text-2xl font-bold font-display text-foreground text-center mb-1 relative pb-4">
              Create Account
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-[3px] rounded-full gradient-primary" />
            </h1>

            <div className="space-y-3 mt-6">
              <div className="space-y-1.5">
                <Label className="text-foreground/80 text-xs font-medium">Full Name</Label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={isSignUp ? name : ""}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignUp}
                  className="h-11 rounded-xl border-2 border-border bg-card/80 focus:border-primary transition-all text-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-foreground/80 text-xs font-medium">Email</Label>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={isSignUp ? email : ""}
                  onChange={(e) => setEmail(e.target.value)}
                  required={isSignUp}
                  className="h-11 rounded-xl border-2 border-border bg-card/80 focus:border-primary transition-all text-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-foreground/80 text-xs font-medium">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={isSignUp ? password : ""}
                    onChange={(e) => setPassword(e.target.value)}
                    required={isSignUp}
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
              disabled={loading}
              className="w-full mt-6 h-11 rounded-xl gradient-primary text-primary-foreground font-semibold hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              {loading && isSignUp ? "Creating account…" : "Sign Up"}
            </Button>

            <div className="md:hidden mt-5 text-center">
              <p className="text-sm text-muted-foreground">Already have an account?</p>
              <button type="button" onClick={toggle} className="text-primary font-semibold text-sm hover:underline mt-1">Sign In</button>
            </div>
          </form>
        </div>

        {/* ===== OVERLAY PANEL ===== */}
        <div
          className="absolute top-0 h-full w-1/2 z-[100] overflow-hidden transition-all duration-700 max-md:hidden"
          style={{
            right: isSignUp ? undefined : 0,
            left: isSignUp ? 0 : undefined,
            transform: "translateX(0)",
          }}
        >
          <div className="w-full h-full gradient-primary flex flex-col items-center justify-center text-center px-10">
            <h2
              className="text-3xl font-extrabold font-display text-primary-foreground tracking-tight mb-4"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
            >
              {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
            </h2>
            <p className="text-primary-foreground/80 text-base leading-relaxed mb-8 max-w-[260px]">
              {isSignUp
                ? "To keep connected with us please login with your personal info"
                : "Enter your personal details and start your journey with us"}
            </p>
            <button
              onClick={toggle}
              className="px-8 py-2.5 rounded-xl border-2 border-primary-foreground/40 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Back to home */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-primary-foreground/70 hover:text-primary-foreground text-sm font-medium transition-colors"
      >
        ← Back to home
      </Link>
    </div>
  );
};

export default Auth;
