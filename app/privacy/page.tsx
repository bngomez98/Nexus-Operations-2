export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-foreground">Nexus Ops</a>
          <a href="/" className="text-sm font-medium text-foreground hover:text-primary">Back Home</a>
        </nav>
      </header>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-foreground">
          <div>
            <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
            <p className="text-muted-foreground">We collect information you provide directly to us, such as name, email, phone number, and project details. We also automatically collect certain information about your device and how you interact with our site.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
            <p className="text-muted-foreground">We use the information we collect to provide, maintain, and improve our services, process transactions, send promotional communications, and comply with legal obligations.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Data Security</h2>
            <p className="text-muted-foreground">We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Sharing Your Information</h2>
            <p className="text-muted-foreground">We do not sell your personal information. We may share information with service providers who assist us in operating our website and conducting our business, subject to confidentiality obligations.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
            <p className="text-muted-foreground">You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at privacy@nexusops.com.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p className="text-muted-foreground">If you have questions about this privacy policy or our privacy practices, please contact us at privacy@nexusops.com or call (785) 555-1234.</p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">Last updated: March 2024</p>
        </div>
      </section>

      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Nexus Operations. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
