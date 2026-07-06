"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ExternalLink, Users, MapPin, Star, GitFork, 
  Play, BookOpen, Heart, Eye, Award, Check
} from "lucide-react";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";
import { SiMyanimelist } from "react-icons/si";

interface PreviewCardProps {
  social: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function SocialPreviewCard({ social, onMouseEnter, onMouseLeave }: PreviewCardProps) {
  // Common container animation
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: -70, 
      scale: 0.05, 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        type: "spring" as const, 
        stiffness: 260, 
        damping: 22 
      }
    },
    exit: { 
      opacity: 0, 
      x: -50, 
      scale: 0.05,
      transition: { 
        duration: 0.25, 
        ease: "easeIn" as const 
      }
    }
  };

  switch (social) {
    case "github":
      return (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ transformOrigin: "left center" }}
          className="absolute left-20 bottom-16 w-80 md:w-96 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/80 dark:bg-neutral-950/85 backdrop-blur-xl shadow-2xl p-5 overflow-hidden text-neutral-800 dark:text-neutral-200 pointer-events-auto"
        >
          {/* GitHub Header */}
          <div className="flex items-center space-x-3 mb-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 shrink-0">
              <Image 
                src="/social-mockup-profiles/github-profile.jpg" 
                alt="Mitchel Mohamad Affandi" 
                fill 
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div>
              <h4 className="font-semibold text-sm leading-tight">Mitchel Mohamad Affandi</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">mitcheltastic <span className="text-[10px] text-neutral-400 dark:text-neutral-500">• he/him</span></p>
            </div>
            <a 
              href="https://github.com/mitcheltastic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-auto text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          </div>

          {/* GitHub Bio */}
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2 leading-relaxed">
            Fullstack developer, AI & Cloud enthusiast, currently pursuing a bachelor's degree in Telecommunication Engineering at Telkom University.
          </p>

          {/* GitHub Stats & Info */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400 border-b border-neutral-200/50 dark:border-neutral-800/50 pb-2.5 mb-3">
            <div className="flex items-center">
              <Users size={12} className="mr-1 text-neutral-400" />
              <span><strong className="text-neutral-800 dark:text-neutral-200">17</strong> followers</span>
            </div>
            <div className="flex items-center text-neutral-400">•</div>
            <div className="flex items-center">
              <span><strong className="text-neutral-800 dark:text-neutral-200">26</strong> following</span>
            </div>
            <div className="flex items-center ml-auto text-[11px]">
              <MapPin size={12} className="mr-0.5 text-neutral-400" />
              <span>Bandung, ID</span>
            </div>
          </div>

          {/* Organizations Row */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3 text-[10px] text-neutral-500">
            <span className="font-bold uppercase tracking-wider text-neutral-400">Organizations:</span>
            <span className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 font-medium">@CPS-TelU</span>
            <span className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 font-medium">@ekshalasi-langit-biru</span>
          </div>

          {/* Pinned Repositories */}
          <div className="space-y-2.5">
            <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Popular Repositories</p>
            
            {/* Repo 1 */}
            <div className="p-2.5 bg-neutral-50/50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-neutral-900 dark:text-white hover:underline cursor-pointer">
                  portoweb-v1
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono">
                  TypeScript
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mb-1.5">
                This is me working on my 1st portofolio website.
              </p>
              <div className="flex space-x-3 text-[10px] text-neutral-400">
                <span className="flex items-center"><Star size={10} className="mr-0.5" /> 1</span>
                <span className="flex items-center"><GitFork size={10} className="mr-0.5" /> 0</span>
              </div>
            </div>

            {/* Repo 2 */}
            <div className="p-2.5 bg-neutral-50/50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-neutral-900 dark:text-white hover:underline cursor-pointer">
                  SECE_Backend
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono">
                  Python
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mb-1.5">
                Backend API server for student engagement and course evaluation.
              </p>
              <div className="flex space-x-3 text-[10px] text-neutral-400">
                <span className="flex items-center"><Star size={10} className="mr-0.5" /> 1</span>
                <span className="flex items-center"><GitFork size={10} className="mr-0.5" /> 0</span>
              </div>
            </div>
          </div>

          {/* GitHub Activity Grid Mockup */}
          <div className="mt-4 pt-3 border-t border-neutral-200/50 dark:border-neutral-800/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Contributions</span>
              <span className="text-[10px] text-neutral-500 font-mono">347 contributions in the last year</span>
            </div>
            <div className="flex space-x-[2px] justify-between">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-[2px]">
                  {Array.from({ length: 4 }).map((_, j) => {
                    const level = (i * j + i) % 5;
                    const colors = [
                      "bg-neutral-100 dark:bg-neutral-900",
                      "bg-green-200/50 dark:bg-green-950/40",
                      "bg-green-300 dark:bg-green-900/60",
                      "bg-green-500 dark:bg-green-600",
                      "bg-green-700 dark:bg-green-500"
                    ];
                    return (
                      <div 
                        key={j} 
                        className={`w-2.5 h-2.5 rounded-sm transition-all duration-300 ${colors[level]} hover:scale-110`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      );

    case "linkedin":
      return (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ transformOrigin: "left center" }}
          className="absolute left-20 bottom-16 w-80 md:w-96 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/80 dark:bg-neutral-950/85 backdrop-blur-xl shadow-2xl overflow-hidden text-neutral-800 dark:text-neutral-200 pointer-events-auto"
        >
          {/* LinkedIn Banner Image */}
          <div className="h-16 relative w-full bg-blue-700">
            <Image 
              src="/social-mockup-profiles/linkedin-banner.png" 
              alt="LinkedIn Banner" 
              fill 
              className="object-cover"
              sizes="384px"
            />
          </div>

          {/* Profile Details Container */}
          <div className="px-5 pb-5 pt-0 relative">
            {/* Profile Image Offset */}
            <div className="relative -mt-10 mb-2.5 w-20 h-20 rounded-full border-4 border-white dark:border-neutral-950 overflow-hidden shadow-md">
              <Image 
                src="/MitchAboutMe.jpg" 
                alt="Mitchel Mohamad (Mitch) Affandi" 
                fill 
                className="object-cover"
                sizes="80px"
              />
            </div>

            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-base leading-tight flex items-center">
                  Mitchel Mohamad (Mitch) Affandi
                  <FiLinkedin className="text-blue-600 ml-1.5 text-sm shrink-0" />
                </h4>
                <p className="text-[11px] font-normal leading-normal text-neutral-600 dark:text-neutral-300 mt-1">
                  Cloud Infrastructure Engineer Intern at PT Telkom Infrastruktur Indonesia (Infranexia) | Backend Developer at BiruLangit
                </p>
                <div className="flex flex-wrap items-center mt-2.5 text-[10px] text-neutral-500 dark:text-neutral-400 gap-x-2 gap-y-0.5">
                  <span className="flex items-center"><MapPin size={12} className="mr-0.5" /> Bandung, West Java, Indonesia</span>
                  <span className="text-neutral-400">•</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">500+ connections</span>
                </div>
              </div>
              
              <a 
                href="https://linkedin.com/in/mitchaff" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-neutral-400 hover:text-neutral-700 dark:hover:text-white shrink-0 ml-2"
              >
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Experience Highlights */}
            <div className="mt-4 pt-3.5 border-t border-neutral-200/50 dark:border-neutral-800/50 space-y-3">
              <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Latest Experience</p>
              
              {/* Job 1 */}
              <div className="flex items-start space-x-2.5">
                <div className="relative w-8 h-8 rounded overflow-hidden border border-neutral-200/50 dark:border-neutral-800/50 bg-white shrink-0">
                  <Image 
                    src="/logos/Infranexia.png" 
                    alt="Infranexia" 
                    fill 
                    className="object-contain p-0.5"
                    sizes="32px"
                  />
                </div>
                <div>
                  <h5 className="font-semibold text-xs leading-tight">Cloud Infrastructure Engineer</h5>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">PT Telkom Infrastruktur Indonesia (Infranexia) • Internship</p>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">Virtualization & SDN Operations. Evaluating migrations from OLVM to OpenStack.</p>
                </div>
              </div>

              {/* Job 2 */}
              <div className="flex items-start space-x-2.5">
                <div className="relative w-8 h-8 rounded overflow-hidden border border-neutral-200/50 dark:border-neutral-800/50 bg-white shrink-0">
                  <Image 
                    src="/logos/birulangit.png" 
                    alt="BiruLangit" 
                    fill 
                    className="object-contain p-0.5"
                    sizes="32px"
                  />
                </div>
                <div>
                  <h5 className="font-semibold text-xs leading-tight">Backend Developer</h5>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">BiruLangit • Contract</p>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">Designed Golang microservices monitoring system. Optimized database queries using Redis.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mt-4 pt-1">
              <a
                href="https://linkedin.com/in/mitchaff"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs text-center transition-colors shadow-md shadow-blue-500/10"
              >
                Connect
              </a>
              <a
                href="mailto:mitch.affandi22@gmail.com"
                className="flex-1 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 font-medium text-xs text-center transition-colors"
              >
                Message
              </a>
            </div>
          </div>
        </motion.div>
      );

    case "instagram":
      return (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ transformOrigin: "left center" }}
          className="absolute left-20 bottom-16 w-80 md:w-96 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/80 dark:bg-neutral-950/85 backdrop-blur-xl shadow-2xl p-5 text-neutral-800 dark:text-neutral-200 pointer-events-auto"
        >
          {/* Instagram Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm tracking-tight">mtchffnd</span>
              <div className="w-3.5 h-3.5 rounded-full bg-sky-500 flex items-center justify-center text-[8px] text-white font-bold">
                ✓
              </div>
            </div>
            <a 
              href="https://www.instagram.com/mtchffnd" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              <ExternalLink size={15} />
            </a>
          </div>

          {/* Profile Stats Row */}
          <div className="flex items-center space-x-6 mb-4">
            <div className="relative w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 shrink-0">
              <div className="relative w-full h-full rounded-full border-2 border-white dark:border-neutral-950 overflow-hidden bg-neutral-100">
                <Image 
                  src="/MitchAboutMe.jpg" 
                  alt="mtchffnd" 
                  fill 
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            </div>
            
            <div className="flex-1 flex justify-between px-2 text-center select-none">
              <div>
                <span className="block font-bold text-sm">10</span>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Posts</span>
              </div>
              <div>
                <span className="block font-bold text-sm">954</span>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Followers</span>
              </div>
              <div>
                <span className="block font-bold text-sm">1,032</span>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Following</span>
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div className="text-xs mb-4 leading-normal">
            <span className="font-bold block text-neutral-900 dark:text-white">Mitch Affandi | 2D Philosopher</span>
            <div className="mt-1 font-normal text-neutral-700 dark:text-neutral-300 space-y-0.5">
              <p>☕️ An old soul trapped in a digital landscape</p>
              <p>📜 “𝚁𝚎𝚊𝚍𝚒𝚗𝚐 𝚋𝚎𝚝𝚠𝚎𝚎𝚗 𝚝𝚑𝚎 𝚕𝚒𝚗𝚎𝚜 𝚘𝚏 𝚋𝚎𝚊𝚞𝚝𝚒𝚏𝚞𝚕 𝚕𝚒𝚎𝚜”</p>
              <p>💻 Backend-dev at <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">@birulangit.ofc</span></p>
            </div>
          </div>

          {/* Instagram Post Grid Mockup */}
          <div className="grid grid-cols-3 gap-1">
            {[
              "from-purple-500 to-pink-500",
              "from-blue-600 to-indigo-700",
              "from-amber-400 to-orange-600",
              "from-emerald-400 to-teal-700",
              "from-rose-500 to-red-700",
              "from-sky-400 to-blue-500"
            ].map((gradient, idx) => (
              <div 
                key={idx} 
                className={`aspect-square rounded bg-gradient-to-br ${gradient} opacity-80 hover:opacity-100 hover:scale-[1.02] cursor-pointer transition-all duration-200 relative group flex items-center justify-center`}
              >
                <span className="text-[10px] text-white opacity-0 group-hover:opacity-100 font-bold transition-opacity">
                  ❤️ 142
                </span>
              </div>
            ))}
          </div>

          {/* Action button */}
          <a
            href="https://www.instagram.com/mtchffnd"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-center text-xs font-semibold mt-4 transition-colors"
          >
            Follow on Instagram
          </a>
        </motion.div>
      );

    case "youtube":
      return (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ transformOrigin: "left center" }}
          className="absolute left-20 bottom-16 w-80 md:w-96 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/80 dark:bg-neutral-950/85 backdrop-blur-xl shadow-2xl overflow-hidden text-neutral-800 dark:text-neutral-200 pointer-events-auto"
        >
          {/* YouTube Banner */}
          <div className="h-16 relative w-full bg-neutral-900 overflow-hidden">
            <Image 
              src="/social-mockup-profiles/YoutubeBanner.jpg" 
              alt="YouTube Banner" 
              fill 
              className="object-cover"
              sizes="384px"
            />
          </div>

          {/* YouTube Info */}
          <div className="p-5">
            <div className="flex items-start space-x-3.5">
              <div className="relative w-14 h-14 rounded-full border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-100 shrink-0">
                <Image 
                  src="/social-mockup-profiles/YoutubePFP.jpg" 
                  alt="YouTube Channel" 
                  fill 
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base leading-tight">MitchelAffandi</h4>
                  <a 
                    href="https://www.youtube.com/@MitchelAffandi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-red-600 transition-colors"
                  >
                    <ExternalLink size={15} />
                  </a>
                </div>
                <p className="text-[11px] text-neutral-500 mt-0.5">@MitchelAffandi</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">460</span> subscribers • <span className="font-semibold text-neutral-800 dark:text-neutral-200">53</span> videos
                </p>
              </div>
            </div>

            {/* YouTube Channel Description */}
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-3 mb-3 leading-normal line-clamp-2">
              Hi and welcome to my Channel. On this channel, you will encounter all sorts of things which revolve around me :). If you like my content, don't hesitate to show some love by subscribing, liking, and sharing...
            </p>

            {/* Subscribe Action */}
            <div className="flex space-x-2 mb-4">
              <a 
                href="https://www.youtube.com/@MitchelAffandi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs text-center flex items-center justify-center space-x-1 transition-colors"
              >
                <span>Subscribe</span>
              </a>
              <div className="px-3 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-center text-xs text-neutral-500 cursor-pointer">
                🔔
              </div>
            </div>

            {/* Latest Videos */}
            <div className="space-y-2.5">
              <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Latest Uploads</p>

              {/* Video 1 */}
              <div className="flex items-center space-x-2.5 cursor-pointer group">
                <div className="relative w-20 h-11 bg-neutral-200 dark:bg-neutral-900 rounded border border-neutral-200/50 dark:border-neutral-800/50 flex items-center justify-center shrink-0 overflow-hidden">
                  <Play size={14} className="text-neutral-500 group-hover:text-red-600 transition-colors" />
                  <div className="absolute right-1 bottom-0.5 bg-black/85 text-[8px] text-white px-0.5 font-bold rounded">
                    2:45
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-[11px] leading-tight truncate group-hover:text-red-600 transition-colors">
                    How Deep is Your Love - Mateus Asato | MitchysDump Cover
                  </h5>
                  <p className="text-[9px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                    972 views • 1 year ago
                  </p>
                </div>
              </div>

              {/* Video 2 */}
              <div className="flex items-center space-x-2.5 cursor-pointer group">
                <div className="relative w-20 h-11 bg-neutral-200 dark:bg-neutral-900 rounded border border-neutral-200/50 dark:border-neutral-800/50 flex items-center justify-center shrink-0 overflow-hidden">
                  <Play size={14} className="text-neutral-500 group-hover:text-red-600 transition-colors" />
                  <div className="absolute right-1 bottom-0.5 bg-black/85 text-[8px] text-white px-0.5 font-bold rounded">
                    1:15
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-[11px] leading-tight truncate group-hover:text-red-600 transition-colors">
                    Kangen - Dewa 19 [Guitar Solo]
                  </h5>
                  <p className="text-[9px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                    543 views • 1 year ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );

    case "myanimelist":
      return (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ transformOrigin: "left center" }}
          className="absolute left-20 bottom-16 w-80 md:w-96 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/80 dark:bg-neutral-950/85 backdrop-blur-xl shadow-2xl p-5 text-neutral-800 dark:text-neutral-200 pointer-events-auto"
        >
          {/* MAL Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-600/10 dark:bg-blue-600/20 rounded-xl">
              <SiMyanimelist className="text-2xl text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold text-base leading-tight">MitchSenpai22</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">MyAnimeList Profile</p>
            </div>
            <a 
              href="https://myanimelist.net/profile/MitchSenpai22" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-auto text-neutral-400 hover:text-blue-600 transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Anime Stats Summary */}
          <div className="mb-4">
            <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mb-2">Anime Stats</p>
            
            {/* Score Grid */}
            <div className="grid grid-cols-4 gap-2 text-center mb-3">
              <div className="p-1.5 rounded-lg bg-green-50/50 dark:bg-green-950/20 border border-green-200/40 dark:border-green-800/40">
                <span className="block font-bold text-xs text-green-600 dark:text-green-400">4</span>
                <span className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold">Watching</span>
              </div>
              <div className="p-1.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/40 dark:border-blue-800/40">
                <span className="block font-bold text-xs text-blue-600 dark:text-blue-400">284</span>
                <span className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold">Completed</span>
              </div>
              <div className="p-1.5 rounded-lg bg-yellow-50/50 dark:bg-yellow-950/20 border border-yellow-200/40 dark:border-yellow-800/40">
                <span className="block font-bold text-xs text-yellow-600 dark:text-yellow-400">12</span>
                <span className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold">On Hold</span>
              </div>
              <div className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50">
                <span className="block font-bold text-xs text-neutral-600 dark:text-neutral-400">145</span>
                <span className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold">Plan to Watch</span>
              </div>
            </div>

            {/* Total Episodes bar */}
            <div className="flex justify-between items-center text-[10px] text-neutral-500 mb-1">
              <span>Mean Score: <strong className="text-neutral-700 dark:text-neutral-300">8.25</strong></span>
              <span>Episodes: <strong className="text-neutral-700 dark:text-neutral-300">5,432</strong></span>
            </div>
          </div>

          {/* Favorite Shows */}
          <div className="space-y-2.5 pt-3 border-t border-neutral-200/50 dark:border-neutral-800/50">
            <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 font-semibold">Favorites</p>
            
            <div className="flex space-x-2">
              {[
                { title: "Steins;Gate", rating: "10/10", grad: "from-amber-600 to-red-800" },
                { title: "Frieren", rating: "10/10", grad: "from-blue-600 to-indigo-800" },
                { title: "AoT", rating: "9.5/10", grad: "from-zinc-700 to-neutral-900" }
              ].map((show, idx) => (
                <div 
                  key={idx} 
                  className="flex-1 p-2 rounded-xl bg-neutral-50/50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-colors flex flex-col justify-between"
                >
                  <div className={`h-14 rounded-lg bg-gradient-to-br ${show.grad} flex items-center justify-center p-1 text-center mb-1.5`}>
                    <span className="text-[9px] font-bold text-white leading-tight line-clamp-2">
                      {show.title}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="text-neutral-400">Score</span>
                    <span className="font-semibold text-blue-500 dark:text-blue-400">{show.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      );

    default:
      return null;
  }
}
