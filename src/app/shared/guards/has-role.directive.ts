import {
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef,
    OnInit,
    inject,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../DTOs/UserRole';

@Directive({
    selector: '[appHasRole]',
    standalone: true,
})
export class HasRoleDirective implements OnInit {
    @Input('appHasRole') roles: UserRole[] = [];

    private templateRef = inject(TemplateRef<any>);
    private viewContainer = inject(ViewContainerRef);
    private authService = inject(AuthService);

    ngOnInit() {
        this.updateView();
    }

    private updateView() {
        if (this.roles.some((role) => this.authService.hasRole(role))) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
