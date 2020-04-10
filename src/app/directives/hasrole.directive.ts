import { AuthService } from 'src/app/services/auth.service';
import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appHasrole]'
})
export class HasroleDirective implements OnInit {

  @Input('appHasrole') roles: string[];
  constructor( private authService: AuthService, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

  ngOnInit() {
    this.authService.authenticationState.subscribe( _ => {

      if (this.authService.hasRole(this.roles)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
