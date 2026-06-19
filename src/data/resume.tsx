import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Python } from "@/components/ui/svgs/python";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Redis } from "@/components/ui/svgs/redis";
import {Git} from "@/components/ui/svgs/git";

export const DATA = {
  name: "Ronyu 👋",
  initials: "RY",
  url: "https://ronyu.me",
  description:
    "Student dev | Open-source builder |\nFocusing on Crypto",
  summary:
    "nothing",
  avatarUrl: "/me.png",
  skills: [
    { name: "Go", icon: Golang },
    { name: "Python", icon: Python },
    { name: "Postgres", icon: Postgresql },
    { name: "Redis", icon: Redis },
    { name: "Git", icon: Git },
    { name: "Docker", icon: Docker },
    { name: "Kubernetes", icon: Kubernetes },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "kuangrongyu@gmail.com",
    tel: "+44 ",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/oxkrypton",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/",
        icon: Icons.x,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "job@ronyu.me",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Hasn't worked before",
      href: "",
      badges: [],
      location: "",
      title: "",
      logoUrl: "",
      start: "",
      end: "",
      description: "",
    }
    // {
    //   company: "Nvidia",
    //   href: "https://nvidia.com/",
    //   badges: [],
    //   location: "Santa Clara, CA",
    //   title: "Software Engineer",
    //   logoUrl: "/nvidia.png",
    //   start: "January 2020",
    //   end: "April 2020",
    //   description:
    //     "Architected and wrote the entire MVP of the GeForce Now Cloud Gaming internal admin and A/B testing dashboard using React, Redux, TypeScript, and Python.",
    // },
  ],
  education: [
    {
      school: "Nanchang Jiaotong institude",
      href: "https://www.ncjti.edu.cn",
      degree: "Bachelor's Degree of Computer Science (BCS)",
      logoUrl: "/ncjti.png",
      start: "2023",
      end: "2027",
    },
  ],
  projects: [
    {
      title: "Walottery",
      href: "https://walottery.wal",
      dates: "April 2025 - September 2025",
      active: true,
      description:"一个链上实物抽奖平台, 到期随机开奖, 使用 Seal 链上加密技术加密中奖者信息, 只有创建方可以解密查看信息",
      technologies: [
        "React",
        "Typescript",
        "TailwindCSS",
        "Shadcn UI",
        "Move",
        "Sui SDK",
        "Seal",
        "Supabase",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Video",
          href: "https://www.youtube.com/watch?v=qJXAJVqg4w0&t=2s",
          icon: <Icons.youtube className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/oxkrypton/walottery",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/walottery.png",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Sui Overflow Hackthon 2025",
      dates: "May 13rd - 25th, 2025",
      location: "Remote",
      description:
        "An on-chain physical lottery system featuring automated random draws and securely encrypted delivery information accessible only to the creator.",
      image:
        "/suihackathon.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
        {
          title: "Source Code",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/oxkrypton/Walottery",
        },
      ],
    }
  ],
} as const;
