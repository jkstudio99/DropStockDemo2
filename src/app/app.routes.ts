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
import { EReviewsComponent } from './pages/ecommerce-page/e-reviews/e-reviews.component';
import { ERefundsComponent } from './pages/ecommerce-page/e-refunds/e-refunds.component';
import { ESellersComponent } from './pages/ecommerce-page/e-sellers/e-sellers.component';
import { ESellerDetailsComponent } from './pages/ecommerce-page/e-seller-details/e-seller-details.component';
import { ECreateSellerComponent } from './pages/ecommerce-page/e-create-seller/e-create-seller.component';
import { ECategoriesComponent } from './pages/ecommerce-page/e-categories/e-categories.component';
import { ECustomersComponent } from './pages/ecommerce-page/e-customers/e-customers.component';
import { ECustomerDetailsComponent } from './pages/ecommerce-page/e-customer-details/e-customer-details.component';
import { EOrdersComponent } from './pages/ecommerce-page/e-orders/e-orders.component';
import { ECartComponent } from './pages/ecommerce-page/e-cart/e-cart.component';
import { ECheckoutComponent } from './pages/ecommerce-page/e-checkout/e-checkout.component';
import { EOrderDetailsComponent } from './pages/ecommerce-page/e-order-details/e-order-details.component';
import { ECreateOrderComponent } from './pages/ecommerce-page/e-create-order/e-create-order.component';
import { EOrderTrackingComponent } from './pages/ecommerce-page/e-order-tracking/e-order-tracking.component';
import { EProductsGridComponent } from './pages/ecommerce-page/e-products-grid/e-products-grid.component';
import { EProductsListComponent } from './pages/ecommerce-page/e-products-list/e-products-list.component';
import { EProductDetailsComponent } from './pages/ecommerce-page/e-product-details/e-product-details.component';
import { ECreateProductComponent } from './pages/ecommerce-page/e-create-product/e-create-product.component';
import { EEditProductComponent } from './pages/ecommerce-page/e-edit-product/e-edit-product.component';
import { InvoicesPageComponent } from './pages/invoices-page/invoices-page.component';
import { InvoicesComponent } from './pages/invoices-page/invoices/invoices.component';
import { InvoiceDetailsComponent } from './pages/invoices-page/invoice-details/invoice-details.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { TeamMembersComponent } from './pages/users-page/team-members/team-members.component';
import { UsersListComponent } from './pages/users-page/users-list/users-list.component';
import { AddUserComponent } from './pages/users-page/add-user/add-user.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { EventsGridComponent } from './pages/events-page/events-grid/events-grid.component';
import { EventsListComponent } from './pages/events-page/events-list/events-list.component';
import { EventDetailsComponent } from './pages/events-page/event-details/event-details.component';
import { CreateAnEventComponent } from './pages/events-page/create-an-event/create-an-event.component';
import { EditAnEventComponent } from './pages/events-page/edit-an-event/edit-an-event.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { PUserProfileComponent } from './pages/profile-page/p-user-profile/p-user-profile.component';
import { PTeamsComponent } from './pages/profile-page/p-teams/p-teams.component';
import { PProjectsComponent } from './pages/profile-page/p-projects/p-projects.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { InternalErrorComponent } from './common/internal-error/internal-error.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
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
import { LockScreenComponent } from './authentication/lock-screen/lock-screen.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { UiElementsComponent } from './ui-elements/ui-elements.component';
import { AlertsComponent } from './ui-elements/alerts/alerts.component';
import { AutocompleteComponent } from './ui-elements/autocomplete/autocomplete.component';
import { AccordionComponent } from './ui-elements/accordion/accordion.component';
import { AvatarsComponent } from './ui-elements/avatars/avatars.component';
import { BadgesComponent } from './ui-elements/badges/badges.component';
import { BreadcrumbComponent } from './ui-elements/breadcrumb/breadcrumb.component';
import { ButtonToggleComponent } from './ui-elements/button-toggle/button-toggle.component';
import { BottomSheetComponent } from './ui-elements/bottom-sheet/bottom-sheet.component';
import { ButtonsComponent } from './ui-elements/buttons/buttons.component';
import { CardComponent } from './ui-elements/card/card.component';
import { CarouselComponent } from './ui-elements/carousel/carousel.component';
import { CheckboxComponent } from './ui-elements/checkbox/checkbox.component';
import { ChipsComponent } from './ui-elements/chips/chips.component';
import { ClipboardComponent } from './ui-elements/clipboard/clipboard.component';
import { ColorPickerComponent } from './ui-elements/color-picker/color-picker.component';
import { DividerComponent } from './ui-elements/divider/divider.component';
import { DragDropComponent } from './ui-elements/drag-drop/drag-drop.component';
import { DatepickerComponent } from './ui-elements/datepicker/datepicker.component';
import { DialogComponent } from './ui-elements/dialog/dialog.component';
import { GridListComponent } from './ui-elements/grid-list/grid-list.component';
import { FormFieldComponent } from './ui-elements/form-field/form-field.component';
import { ExpansionComponent } from './ui-elements/expansion/expansion.component';
import { IconComponent } from './ui-elements/icon/icon.component';
import { InputComponent } from './ui-elements/input/input.component';
import { ListComponent } from './ui-elements/list/list.component';
import { ListboxComponent } from './ui-elements/listbox/listbox.component';
import { MenusComponent } from './ui-elements/menus/menus.component';
import { PaginationComponent } from './ui-elements/pagination/pagination.component';
import { ProgressBarComponent } from './ui-elements/progress-bar/progress-bar.component';
import { RadioComponent } from './ui-elements/radio/radio.component';
import { RatioComponent } from './ui-elements/ratio/ratio.component';
import { SelectComponent } from './ui-elements/select/select.component';
import { SidenavComponent } from './ui-elements/sidenav/sidenav.component';
import { SlideToggleComponent } from './ui-elements/slide-toggle/slide-toggle.component';
import { SliderComponent } from './ui-elements/slider/slider.component';
import { SnackbarComponent } from './ui-elements/snackbar/snackbar.component';
import { StepperComponent } from './ui-elements/stepper/stepper.component';
import { TypographyComponent } from './ui-elements/typography/typography.component';
import { TooltipComponent } from './ui-elements/tooltip/tooltip.component';
import { ToolbarComponent } from './ui-elements/toolbar/toolbar.component';
import { TableComponent } from './ui-elements/table/table.component';
import { TabsComponent } from './ui-elements/tabs/tabs.component';
import { TreeComponent } from './ui-elements/tree/tree.component';
import { VideosComponent } from './ui-elements/videos/videos.component';
import { UtilitiesComponent } from './ui-elements/utilities/utilities.component';
import { FormsComponent } from './forms/forms.component';
import { BasicElementsComponent } from './forms/basic-elements/basic-elements.component';
import { FileUploaderComponent } from './forms/file-uploader/file-uploader.component';
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
                children: [
                    { path: '', component: EProductsGridComponent },
                    {
                        path: 'products-list',
                        component: EProductsListComponent,
                    },
                    {
                        path: 'product-details',
                        component: EProductDetailsComponent,
                    },
                    {
                        path: 'create-product',
                        component: ECreateProductComponent,
                    },
                    {
                        path: 'edit-product/:id',
                        component: EEditProductComponent,
                    },
                    { path: 'orders', component: EOrdersComponent },
                    {
                        path: 'order-details',
                        component: EOrderDetailsComponent,
                    },
                    { path: 'create-order', component: ECreateOrderComponent },
                    {
                        path: 'order-tracking',
                        component: EOrderTrackingComponent,
                    },
                    { path: 'customers', component: ECustomersComponent },
                    {
                        path: 'customer-details',
                        component: ECustomerDetailsComponent,
                    },
                    { path: 'cart', component: ECartComponent },
                    { path: 'checkout', component: ECheckoutComponent },
                    { path: 'sellers', component: ESellersComponent },
                    {
                        path: 'seller-details',
                        component: ESellerDetailsComponent,
                    },
                    {
                        path: 'create-seller',
                        component: ECreateSellerComponent,
                    },
                    { path: 'categories', component: ECategoriesComponent },
                    { path: 'reviews', component: EReviewsComponent },
                    { path: 'refunds', component: ERefundsComponent },
                ],
            },

            {
                path: 'events',
                component: EventsPageComponent,
                children: [
                    { path: '', component: EventsGridComponent },
                    { path: 'events-list', component: EventsListComponent },
                    { path: 'event-details', component: EventDetailsComponent },
                    {
                        path: 'create-an-event',
                        component: CreateAnEventComponent,
                    },
                    { path: 'edit-an-event', component: EditAnEventComponent },
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
                    { path: '', component: AlertsComponent },
                    { path: 'autocomplete', component: AutocompleteComponent },
                    { path: 'avatars', component: AvatarsComponent },
                    { path: 'accordion', component: AccordionComponent },
                    { path: 'badges', component: BadgesComponent },
                    { path: 'breadcrumb', component: BreadcrumbComponent },
                    { path: 'button-toggle', component: ButtonToggleComponent },
                    { path: 'bottom-sheet', component: BottomSheetComponent },
                    { path: 'buttons', component: ButtonsComponent },
                    { path: 'card', component: CardComponent },
                    { path: 'carousel', component: CarouselComponent },
                    { path: 'checkbox', component: CheckboxComponent },
                    { path: 'chips', component: ChipsComponent },
                    { path: 'clipboard', component: ClipboardComponent },
                    { path: 'color-picker', component: ColorPickerComponent },
                    { path: 'datepicker', component: DatepickerComponent },
                    { path: 'dialog', component: DialogComponent },
                    { path: 'divider', component: DividerComponent },
                    { path: 'drag-drop', component: DragDropComponent },
                    { path: 'expansion', component: ExpansionComponent },
                    { path: 'form-field', component: FormFieldComponent },
                    { path: 'grid-list', component: GridListComponent },
                    { path: 'input', component: InputComponent },
                    { path: 'icon', component: IconComponent },
                    { path: 'list', component: ListComponent },
                    { path: 'listbox', component: ListboxComponent },
                    { path: 'menus', component: MenusComponent },
                    { path: 'pagination', component: PaginationComponent },
                    { path: 'progress-bar', component: ProgressBarComponent },
                    { path: 'radio', component: RadioComponent },
                    { path: 'ratio', component: RatioComponent },
                    { path: 'select', component: SelectComponent },
                    { path: 'sidenav', component: SidenavComponent },
                    { path: 'slide-toggle', component: SlideToggleComponent },
                    { path: 'slider', component: SliderComponent },
                    { path: 'snackbar', component: SnackbarComponent },
                    { path: 'stepper', component: StepperComponent },
                    { path: 'table', component: TableComponent },
                    { path: 'tabs', component: TabsComponent },
                    { path: 'toolbar', component: ToolbarComponent },
                    { path: 'tooltip', component: TooltipComponent },
                    { path: 'tree', component: TreeComponent },
                    { path: 'typography', component: TypographyComponent },
                    { path: 'videos', component: VideosComponent },
                    { path: 'utilities', component: UtilitiesComponent },
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
            {
                path: 'forms',
                component: FormsComponent,
                children: [
                    { path: '', component: BasicElementsComponent },
                    { path: 'file-uploader', component: FileUploaderComponent },
                ],
            },

            { path: 'search', component: SearchPageComponent },
            { path: 'internal-error', component: InternalErrorComponent },
            { path: 'widgets', component: WidgetsComponent },
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
            { path: 'lock-screen', component: LockScreenComponent },
            { path: 'logout', component: LogoutComponent },
        ],
    },
    // Here add new pages component

    { path: '**', component: NotFoundComponent }, // This line will remain down from the whole pages component list
];
