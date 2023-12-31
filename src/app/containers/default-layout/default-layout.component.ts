import { Component } from '@angular/core';

import {
  navItemMenu,
  navItemsSuperAdmin,
  navItemsEMSAdmin,
  navItemsEMSUser,
  navItemsCCAdmin,
  navItemsCCUser,
  navItemsCCUserDeliquent,
  navItemsICMSAdmin,
  navItemsICMSDistrict,
  navItemsICMSDistrictDirector,
  navItemsICMSBranch,
  navItemsICMSProvision,
  navItemsICMSBranchManager,
  navItemsICMSBankingOperation,
  navItemsSASVAdmin,
  navItemsSASVUser,
  navItemsMemoAdmin,
  navItemsMemoUser,
  navItemsECXAdmin,
  navItemsECXUser,
  navItemsCMSAdmin,
  navItemsCMSUser,
  navItemSupervisor,
  navItemsAMSAdmin
} from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems = [];
  public dashboardRoute: string = ""

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {
    addIndentClass(navItemsSuperAdmin);
    addIndentClass(navItemsEMSAdmin);
    addIndentClass(navItemsEMSUser);
    addIndentClass(navItemsCCAdmin);
    addIndentClass(navItemsCCUser);
    addIndentClass(navItemsCCUserDeliquent);
    addIndentClass(navItemsICMSAdmin);
    addIndentClass(navItemsICMSDistrict);
    addIndentClass(navItemsICMSDistrictDirector);
    addIndentClass(navItemsICMSBranch);
    addIndentClass(navItemsICMSProvision);
    addIndentClass(navItemsICMSBranchManager);
    addIndentClass(navItemsICMSBankingOperation);
    addIndentClass(navItemsSASVAdmin);
    addIndentClass(navItemsSASVUser);
    addIndentClass(navItemsMemoAdmin);
    addIndentClass(navItemsMemoUser);
    addIndentClass(navItemsECXAdmin);
    addIndentClass(navItemsECXUser);
    addIndentClass(navItemsCMSAdmin);
    addIndentClass(navItemsCMSUser);
    addIndentClass(navItemSupervisor);
    addIndentClass(navItemsAMSAdmin);
    this.navItems.push(navItemMenu);
    const totalModules = Number(localStorage.getItem('number_of_modules')) + 1;
    const otp = localStorage.getItem('otp') == "true";
    if (!otp) {
      for (let i = 0; i <= totalModules; i++) {
        let moduleStatus = localStorage.getItem("module_" + i) === "true"
        if (moduleStatus) {
          switch (localStorage.getItem("role_" + i)) {
            case "ROLE_SUPER_ADMIN":
              this.navItems.push(navItemsSuperAdmin);
              this.dashboardRoute = "default_dashboard"
              if (localStorage.getItem("supervisor") === "true") {

                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_EMS_ADMIN":
              this.navItems.push(navItemsEMSAdmin);
              this.dashboardRoute = "default_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_EMS_USER":
              this.navItems.push(navItemsEMSUser);
              this.dashboardRoute = "cc_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_CC_ADMIN":
              this.navItems.push(navItemsCCAdmin);
              this.dashboardRoute = "cc_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_CC_USER":
              this.navItems.push(navItemsCCUser);
              this.dashboardRoute = "cc_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_CC_USER_DELIQUENT":
              this.navItems.push(navItemsCCUserDeliquent);
              this.dashboardRoute = "cc_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_ICMS_ADMIN":
              this.navItems.push(navItemsICMSAdmin);
              this.dashboardRoute = "icms_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_ICMS_DISTRICT_IC":
              this.navItems.push(navItemsICMSDistrict);
              this.dashboardRoute = "default_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_ICMS_BRANCH_IC":
              this.navItems.push(navItemsICMSBranch);
              this.dashboardRoute = "default_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_ICMS_PROVISION":
              this.navItems.push(navItemsICMSProvision);
              this.dashboardRoute = "default_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_ICMS_BRANCH_MANAGER":
              this.navItems.push(navItemsICMSBranchManager);
              this.dashboardRoute = "default_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
              case "ROLE_ICMS_BANKING_OPERATION":
                this.navItems.push(navItemsICMSBankingOperation);
                this.dashboardRoute = "default_dashboard"
                if(localStorage.getItem("supervisor") === "true"){
                  // if(true){
                  this.navItems.push(navItemSupervisor);
                }
                break;
              case "ROLE_ICMS_DISTRICT_DIRECTOR":
                this.navItems.push(navItemsICMSDistrictDirector);
                this.dashboardRoute = "default_dashboard"
                if(localStorage.getItem("supervisor") === "true"){
                  // if(true){
                  this.navItems.push(navItemSupervisor);
                }
                break;
            case "ROLE_SASV_ADMIN":
              this.navItems.push(navItemsSASVAdmin);
              this.dashboardRoute = "default_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_SASV_USER":
              this.navItems.push(navItemsSASVUser);
              this.dashboardRoute = "default_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_MEMO_ADMIN":
              this.navItems.push(navItemsMemoAdmin);
              this.dashboardRoute = "default_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_MEMO_USER":
              this.navItems.push(navItemsMemoUser);
              this.dashboardRoute = "default_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_ECX_ADMIN":
              this.navItems.push(navItemsECXAdmin);
              this.dashboardRoute = "default_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_ECX_USER":
              this.navItems.push(navItemsECXUser);
              this.dashboardRoute = "default_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_CMS_ADMIN":
              this.navItems.push(navItemsCMSAdmin);
              this.dashboardRoute = "cms_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_CMS_USER":
              this.navItems.push(navItemsCMSUser);
              this.dashboardRoute = "default_dashboard"
              if (localStorage.getItem("supervisor") === "true") {
                if (!this.navItems.includes(navItemSupervisor)) {
                  this.navItems.push(navItemSupervisor);
                }
              }
              break;
            case "ROLE_AMS_ADMIN":
              this.navItems.push(navItemsAMSAdmin);
              this.dashboardRoute = "default_dashboard"
              break;
          }
        }
      }
    }
  }
}

function addIndentClass(obj: any, level: number = 0) {
  for (const key in obj) {
    if (key === 'name' && typeof obj[key] === 'string') {
      if (level === 1) {
        obj['class'] = 'indent-1';
      } else if (level === 2) {
        obj['class'] = 'indent-2';
      }
    } else if (key === 'children' && Array.isArray(obj[key])) {
      obj[key].forEach((child: any) => addIndentClass(child, level + 1));
    }
  }
}
