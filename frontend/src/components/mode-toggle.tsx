import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const getEffectiveTheme = () => {
            if (theme === "system") {
                return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
            }
            return theme
        }

        setIsDark(getEffectiveTheme() === "dark")
    }, [theme])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="text-foreground">
                    <Sun
                        className={`h-[1.2rem] w-[1.2rem] transition-all duration-200 ${isDark ? 'scale-0 -rotate-90' : 'scale-100 rotate-0'
                            }`}
                    />
                    <Moon
                        className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-200 ${isDark ? 'scale-100 rotate-0' : 'scale-0 rotate-90'
                            }`}
                    />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}