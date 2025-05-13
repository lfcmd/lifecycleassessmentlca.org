
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LanguageSwitcher: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("中文");
  const { toast } = useToast();

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    
    toast({
      title: "语言已切换",
      description: `已将语言切换为${language}`,
      duration: 2000,
    });
    
    // Here you would implement the actual language change logic
    // This is just a placeholder for demonstration purposes
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full w-9 h-9">
          <Languages className="h-4 w-4" />
          <span className="sr-only">切换语言</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("中文")}
          className={currentLanguage === "中文" ? "bg-muted" : ""}
        >
          中文
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("English")}
          className={currentLanguage === "English" ? "bg-muted" : ""}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
