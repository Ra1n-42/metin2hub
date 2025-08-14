function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="text-foreground w-full py-4 border-t border-gray-300 text-center text-sm">
            <p>© {year} Metin2AssetHub. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
