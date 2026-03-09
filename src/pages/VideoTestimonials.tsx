import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Video, Upload, Play, Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";

const sampleVideos = [
  { name: "Sarah Chen", role: "VP Sales, TechCorp", avatar: "SC", duration: "1:24" },
  { name: "Marcus Johnson", role: "CTO, GrowthIO", avatar: "MJ", duration: "2:05" },
  { name: "Elena Petrova", role: "Head of Growth, ScaleUp", avatar: "EP", duration: "1:48" },
  { name: "Cristofer Levin", role: "Engineering Lead, DataSync", avatar: "CL", duration: "1:32" },
  { name: "Marilyn George", role: "Sales Director, Outreach Inc", avatar: "MG", duration: "2:15" },
  { name: "David Park", role: "CEO, LeadStack", avatar: "DP", duration: "1:58" },
];

const VideoTestimonials = () => {
  const [showForm, setShowForm] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={16} />
              <span className="text-sm">Back</span>
            </Link>
            <span className="text-xl font-bold gradient-text">Enrich</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="hero" size="sm" onClick={() => setShowForm(true)}>
              <Upload size={14} className="mr-2" /> Submit Your Story
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground mb-6">
              <Video size={12} className="text-primary" />
              Video Testimonials
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              Hear from our <span className="gradient-text">customers</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Real stories from real teams using Enrich it t it t it to transform their growth.
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
            {sampleVideos.map(({ name, role, avatar, duration }) => (
              <div key={name} className="glass rounded-xl overflow-hidden glow-border group cursor-pointer">
                {/* Video thumbnail placeholder */}
                <div className="relative aspect-video bg-muted/50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/60" />
                  <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play size={22} className="text-primary-foreground ml-1" />
                  </div>
                  <span className="absolute bottom-3 right-3 text-xs text-muted-foreground glass rounded px-2 py-0.5">
                    {duration}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{name}</p>
                      <p className="text-xs text-muted-foreground">{role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit form */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" onClick={() => setShowForm(false)}>
              <div className="glass-strong rounded-2xl p-8 max-w-lg w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-1">Submit your testimonial</h3>
                <p className="text-sm text-muted-foreground mb-6">Share your experience withriit it</p>
                <div className="space-y-4">
                  <Input placeholder="Your name" className="bg-background/50" />
                  <Input placeholder="Role & Company" className="bg-background/50" />
                  <Input placeholder="Email" type="email" className="bg-background/50" />
                  <Textarea placeholder="Tell us about your experience..." className="bg-background/50 min-h-[100px]" />
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                    <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload video</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">MP4, MOV up to 100MB</p>
                  </div>
                  <div className="flex items-center gap-1 justify-center">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={20} className="text-primary/30 hover:text-primary cursor-pointer transition-colors" />
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button variant="ghost" className="flex-1" onClick={() => setShowForm(false)}>Cancel</Button>
                    <Button variant="hero" className="flex-1">Submit</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="text-center glass rounded-2xl p-12 max-w-3xl mx-auto glow-border">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Have a story to share?</h2>
            <p className="text-muted-foreground mb-6">We'd love to hear hoEnrich it ichelped your team grow.</p>
            <Button variant="hero" size="lg" onClick={() => setShowForm(true)}>
              <Video size={16} className="mr-2" /> Record Your Testimonial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTestimonials;
