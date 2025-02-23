import { Github, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"; 

interface SocialLink {
  name: string;
  portfolio: string;
  github: string;
  twitter: string;
  linkedin: string;
  avatar: string;
  description:string;
}

const contributors: SocialLink[] = [
  {
    name: "Yash Vaidya",
    portfolio: "https://yashvaidya.vercel.app/",
    github: "https://github.com/hsayvaidya23",
    twitter: "https://x.com/YashVaidya_23",
    linkedin: "https://www.linkedin.com/in/yashvaidya23/",
    avatar: "/yash.jpg", // Add this image
    description: "Fullstack Engineer @Walbrosoft", // Add description
  },
  {
    name: "Amey Muke",
    portfolio: "https://www.ameymuke.dev/",
    github: "https://github.com/perfect7613",
    twitter: "https://x.com/7613Perfect",
    linkedin: "https://www.linkedin.com/in/amey-muke-065456205/",
    avatar: "/amey.jpg", 
    description: "Consultant/Developer @Brewnbeer", 
  },
];

const Credits = () => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-center">Contributors</h2>
      <div className="flex flex-col gap-6">
        {contributors.map((contributor) => (
          <Card key={contributor.name} className="w-full">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 overflow-hidden rounded-full ring-2 ring-primary/10">
                  <img
                    src={contributor.avatar}
                    alt={contributor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://github.com/identicons/identicon.png";
                    }}
                  />
                </div>
                <div>
                  <CardTitle>{contributor.name}</CardTitle>
                  <CardDescription>Contributor</CardDescription>
                  <CardDescription>{contributor.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <SocialButton href={contributor.portfolio} icon={<LinkIcon className="w-4 h-4" />} label="Portfolio" />
                <SocialButton href={contributor.github} icon={<Github className="w-4 h-4" />} label="GitHub" />
                <SocialButton href={contributor.twitter} icon={<Twitter className="w-4 h-4" />} label="Twitter" />
                <SocialButton href={contributor.linkedin} icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

interface SocialButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialButton = ({ href, icon, label }: SocialButtonProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "inline-flex items-center justify-center w-8 h-8",
      "rounded-full transition-colors duration-200",
      "bg-gray-100 text-gray-600 hover:bg-primary hover:text-white",
      "dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-primary dark:hover:text-white"
    )}
    title={label}
  >
    {icon}
  </a>
);

export default Credits;