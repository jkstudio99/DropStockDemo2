import { Routes } from '@angular/router';
import { FrontPagesComponent } from './front-pages/front-pages.component';
import { HomeComponent } from './front-pages/home/home.component';
import { FeaturesComponent } from './front-pages/features/features.component';
import { TeamComponent } from './front-pages/team/team.component';
import { FaqComponent } from './front-pages/faq/faq.component';
import { ContactComponent } from './front-pages/contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EcommerceComponent } from './dashboard/ecommerce/ecommerce.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppsComponent } from './apps/apps.component';
import { ContactsComponent } from './apps/contacts/contacts.component';
import { CalendarComponent } from './apps/calendar/calendar.component';
import { ChatComponent } from './apps/chat/chat.component';
import { EcommercePageComponent } from './pages/ecommerce-page/ecommerce-page.component';
import { ECategoriesComponent } from './pages/ecommerce-page/e-categories/e-categories.component';
import { ECustomersComponent } from './pages/ecommerce-page/e-customers/e-customers.component';
import { ECustomerDetailsComponent } from './pages/ecommerce-page/e-customer-details/e-customer-details.component';
import { EOrdersListComponent } from './pages/ecommerce-page/e-orders-list/e-orders-list.component';
import { ECreateOrderComponent } from './pages/ecommerce-page/e-create-order/e-create-order.component';
import { ECreateProductComponent } from './pages/ecommerce-page/e-create-product/e-create-product.component';
import { EEditProductComponent } from './pages/ecommerce-page/e-edit-product/e-edit-product.component';
import { InvoicesPageComponent } from './pages/invoices-page/invoices-page.component';
import { InvoicesComponent } from './pages/invoices-page/invoices/invoices.component';
import { InvoiceDetailsComponent } from './pages/invoices-page/invoice-details/invoice-details.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { TeamMembersComponent } from './pages/users-page/team-members/team-members.component';
import { UsersListComponent } from './pages/users-page/users-list/users-list.component';
import { AddUserComponent } from './pages/users-page/add-user/add-user.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { PUserProfileComponent } from './pages/profile-page/p-user-profile/p-user-profile.component';
import { PTeamsComponent } from './pages/profile-page/p-teams/p-teams.component';
import { PProjectsComponent } from './pages/profile-page/p-projects/p-projects.component';
import { InternalErrorComponent } from './common/internal-error/internal-error.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountSettingsComponent } from './settings/account-settings/account-settings.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { PrivacyPolicyComponent } from './settings/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './settings/terms-conditions/terms-conditions.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ConfirmEmailComponent } from './authentication/confirm-email/confirm-email.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { CreateInvoiceComponent } from './pages/invoices-page/create-invoice/create-invoice.component';
import { EditInvoiceComponent } from './pages/invoices-page/edit-invoice/edit-invoice.component';
import { ChartsComponent } from './charts/charts.component';
import { LineChartsComponent } from './charts/line-charts/line-charts.component';
import { AreaChartsComponent } from './charts/area-charts/area-charts.component';
import { ColumnChartsComponent } from './charts/column-charts/column-charts.component';
import { MixedChartsComponent } from './charts/mixed-charts/mixed-charts.component';
import { RadialbarChartsComponent } from './charts/radialbar-charts/radialbar-charts.component';
import { RadarChartsComponent } from './charts/radar-charts/radar-charts.component';
import { PieChartsComponent } from './charts/pie-charts/pie-charts.component';
import { PolarChartsComponent } from './charts/polar-charts/polar-charts.component';
import { MoreChartsComponent } from './charts/more-charts/more-charts.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
import { SalesComponent } from './dashboard/sales/sales.component';
import { EEditOrderComponent } from './pages/ecommerce-page/e-edit-order/e-edit-order.component';
import { EProductsListComponent } from './pages/ecommerce-page/e-products-list/e-products-list.component';
import { authguardGuard } from './shared/guards/authguard.guard';
import { RoleGuard } from './shared/guards/role.guard';
import { UserRole } from './shared/DTOs/UserRoleModel';
import { PaginationComponent } from './ui-elements/pagination/pagination.component';
import { UiElementsComponent } from './ui-elements/ui-elements.component';

export const routes: Routes = [
    {
        path: '',
        component: FrontPagesComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'features', component: FeaturesComponent },
            { path: 'team', component: TeamComponent },
            { path: 'faq', component: FaqComponent },
            { path: 'contact', component: ContactComponent },
        ],
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authguardGuard],
        children: [
            { path: '', component: EcommerceComponent },
            { path: 'analytics', component: AnalyticsComponent },
            { path: 'sales', component: SalesComponent },
            {
                path: 'apps',
                component: AppsComponent,
                children: [
                    { path: 'calendar', component: CalendarComponent },
                    { path: 'contacts', component: ContactsComponent },
                    { path: 'chat', component: ChatComponent },
                ],
            },
            {
                path: 'ecommerce-page',
                component: EcommercePageComponent,
                canActivate: [authguardGuard, RoleGuard],
                data: {
                    roles: [UserRole.Admin, UserRole.Manager, UserRole.User],
                },
                children: [
                    {
                        path: 'products-list',
                        component: EProductsListComponent,
                    },
                    {
                        path: 'create-product',
                        component: ECreateProductComponent,
                    },
                    {
                        path: 'edit-product/:id',
                        component: EEditProductComponent,
                    },
                    { path: 'orders-list', component: EOrdersListComponent },
                    {
                        path: 'edit-order/:id',
                        component: EEditOrderComponent,
                    },
                    { path: 'create-order', component: ECreateOrderComponent },

                    { path: 'customers', component: ECustomersComponent },
                    {
                        path: 'customer-details',
                        component: ECustomerDetailsComponent,
                    },
                    { path: 'categories', component: ECategoriesComponent },
                ],
            },

            {
                path: 'invoices',
                component: InvoicesPageComponent,
                children: [
                    { path: '', component: InvoicesComponent },
                    {
                        path: 'invoice-details',
                        component: InvoiceDetailsComponent,
                    },
                    {
                        path: 'create-invoice',
                        component: CreateInvoiceComponent,
                    },
                    { path: 'edit-invoice', component: EditInvoiceComponent },
                ],
            },
            {
                path: 'users',
                component: UsersPageComponent,
                children: [
                    { path: '', component: TeamMembersComponent },
                    { path: 'users-list', component: UsersListComponent },
                    { path: 'add-user', component: AddUserComponent },
                ],
            },
            {
                path: 'profile',
                component: ProfilePageComponent,
                children: [
                    { path: '', component: PUserProfileComponent },
                    { path: 'teams', component: PTeamsComponent },
                    { path: 'projects', component: PProjectsComponent },
                ],
            },
            {
                path: 'ui-kit',
                component: UiElementsComponent,
                children: [
                    { path: 'pagination', component: PaginationComponent },
                ],
            },
            {
                path: 'charts',
                component: ChartsComponent,
                children: [
                    { path: '', component: LineChartsComponent },
                    { path: 'area', component: AreaChartsComponent },
                    { path: 'column', component: ColumnChartsComponent },
                    { path: 'mixed', component: MixedChartsComponent },
                    { path: 'radialbar', component: RadialbarChartsComponent },
                    { path: 'radar', component: RadarChartsComponent },
                    { path: 'pie', component: PieChartsComponent },
                    { path: 'polar', component: PolarChartsComponent },
                    { path: 'more', component: MoreChartsComponent },
                ],
            },
            { path: 'internal-error', component: InternalErrorComponent },
            { path: 'my-profile', component: MyProfileComponent },
            {
                path: 'settings',
                component: SettingsComponent,
                children: [
                    { path: '', component: AccountSettingsComponent },
                    {
                        path: 'change-password',
                        component: ChangePasswordComponent,
                    },
                    {
                        path: 'privacy-policy',
                        component: PrivacyPolicyComponent,
                    },
                    {
                        path: 'terms-conditions',
                        component: TermsConditionsComponent,
                    },
                ],
            },
        ],
    },
    {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
            { path: 'sign-in', component: SignInComponent },
            { path: 'sign-up', component: SignUpComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'reset-password', component: ResetPasswordComponent },
            { path: 'confirm-email', component: ConfirmEmailComponent },
            { path: 'logout', component: LogoutComponent },
        ],
    },

    // Here add new pages component

    { path: '**', component: NotFoundComponent }, // This line will remain down from the whole pages component list
];
