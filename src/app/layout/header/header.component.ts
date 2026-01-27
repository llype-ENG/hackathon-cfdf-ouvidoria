import { Component, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


export interface HeaderLogo {
  src: string;
  alt: string;
  href?: string;
  height?: number; // default 40
}

export interface HeaderLink {
  label: string;
  href?: string;         // link externo
  routerLink?: string;   // rota interna (se usar Angular Router)
  target?: '_self' | '_blank';
  rel?: string;
  active?: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  

  @Input() logos: HeaderLogo[] = [];

  /** Marca central */
  @Input() brandStrong = 'Participa';
  @Input() brandSuffix = 'DF';
  /** Pode ser string (href), array (routerLink) ou null */
  @Input() brandHref: string | string[] | null = '/';

  /** Ação à direita */
  @Input() signInLabel = 'ENTRAR';
  /** Pode ser string (href), array (routerLink) ou null (usa (signIn)) */
  @Input() signInHref: string | string[] | null = null;
  @Output() signIn = new EventEmitter<void>();

  /** Navegação inferior */
  @Input() links: HeaderLink[] = [
    { label: 'Participa DF', routerLink: '/' },
    { label: 'Acesso à Informação', href: '#' },
    { label: 'Ouvidoria', href: '#' },
    { label: 'Perguntas Frequentes', href: '#' },
    { label: 'Meus Registros', href: '#' },
    { label: 'Transparência', href: '#' },
  ];

  /** Estado do menu no mobile */
  isOpen = signal(false);

  // ---------- Getters para o template (evitam usar typeof/Array no HTML) ----------
  get brandRouterLink(): any[] | null {
    return Array.isArray(this.brandHref) ? (this.brandHref as any[]) : null;
  }
  get brandHrefString(): string | null {
    return typeof this.brandHref === 'string' ? this.brandHref : null;
  }

  get signInRouterLink(): any[] | null {
    return Array.isArray(this.signInHref) ? (this.signInHref as any[]) : null;
  }
  get signInHrefString(): string | null {
    return typeof this.signInHref === 'string' ? this.signInHref : null;
  }

  // ---------- Ações ----------
  toggleMenu() {
    this.isOpen.update(v => !v);
  }
  closeMenu() {
    this.isOpen.set(false);
  }

  onSignInClick(evt: MouseEvent) {
    // Se não tem href/rota, emite o evento para o pai tratar
    if (!this.signInHrefString && !this.signInRouterLink) {
      evt.preventDefault();
      this.signIn.emit();
    }
  }

  @HostListener('document:keydown.escape')
  onEsc() { this.closeMenu(); }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 900 && this.isOpen()) {
      this.closeMenu();
    }
  }

}
