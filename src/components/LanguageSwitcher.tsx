
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();

  const handleLanguageChange = (newLanguage: 'zh' | 'en') => {
    setLanguage(newLanguage);
    
    toast({
      title: language === 'zh' ? "语言已切换" : "Language Changed",
      description: language === 'zh' 
        ? `已将语言切换为${newLanguage === 'zh' ? '中文' : 'English'}`
        : `Language changed to ${newLanguage === 'zh' ? 'Chinese' : 'English'}`,
      duration: 2000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full w-9 h-9">
          <Languages className="h-4 w-4" />
          <span className="sr-only">{language === 'zh' ? '切换语言' : 'Change language'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('zh')}
          className={language === 'zh' ? "bg-muted" : ""}
        >
          中文
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('en')}
          className={language === 'en' ? "bg-muted" : ""}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
