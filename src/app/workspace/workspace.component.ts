import { Component, ElementRef, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import { SidebarComponent, TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { AuthService } from '../auth/auth.service';
import { EmitType } from '@syncfusion/ej2-base';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
  providers:[

 AsyncPipe
  ]
})
export class WorkspaceComponent implements OnInit {
  public show: boolean = false;
  public isAdmin:boolean = false;
  user!: string;
  title:string="Dashboard";
  // @ViewChild('sidebar')
  // sidebar!: SidebarComponent;
//------modal-------//
  @ViewChild('ejDialog')  
  ejDialog!: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: true })
  container!: ElementRef;

  public targetElement!: HTMLElement;
  public position: object = { X: 'right', Y: 'top' };
  public buttons: Object = [
    {
      'click': this.logout.bind(this),
        buttonModel:{
        content: 'Logout',
        isPrimary: true
      }
    },
 
      ];
///////////////////////////////

@ViewChild('sidebarTreeviewInstance')
public sidebarTreeviewInstance!: SidebarComponent;
@ViewChild('treeviewInstance')
public treeviewInstance!: TreeViewComponent;
public width: string = '290px';
public enableDock: boolean = true;
public dockSize:string ="44px";
public mediaQuery: string = ('(min-width: 600px)');
public target: string = '.main-content';
public data:Object =[ {
  nodeId: '01', nodeText: 'Dashboard', iconCss: 'icon-microchip icon',
  url:'/ws/dashboard'
},

{
  nodeId: '02', nodeText: 'product Information', iconCss: 'icon-th icon',

  nodeChild: [
      { nodeId: '02-01', nodeText: 'categories', iconCss: 'icon-circle-thin icon' ,url:'/ws/product/categories'},
      { nodeId: '02-02', nodeText: 'products', iconCss: 'icon-circle-thin icon' ,url:'/ws/product'}, 
  ]
},
{
nodeId: '03', nodeText: 'Orders', iconCss: 'icon-docs icon', url:'/ws/order'
},
{
nodeId: '04', nodeText: 'Viechles', iconCss: 'icon-docs icon', url:'/ws/viechle'
}, 
{
  nodeId: '06', nodeText: 'Logout', iconCss: 'icon-chrome icon',
},];
public field:Object ={ dataSource: this.data, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'iconCss' ,routerLink:'url'};
public field$:BehaviorSubject<Object>=new BehaviorSubject<Object>(this.field);
  constructor(private authService: AuthService , private router:Router,private asyncPipe:AsyncPipe) {  
  }



  // To get all element of the dialog component after component get initialized.
  ngOnInit() {
    this.initilaizeTarget();
    if (this.authService.checkAdminPrivellage()) {
      this.user = 'Admin';
      this.isAdmin = true;
     
    } else {
      this.user = 'System User';
      this.isAdmin = false;
      this.data= [{
        nodeId: '01', nodeText: 'Dashboard', iconCss: 'icon-microchip icon',
        url:'/ws/dashboard'
      },
     
      {
      nodeId: '03', nodeText: 'Orders', iconCss: 'icon-docs icon', url:'/ws/order'
      },
      {
        nodeId: '06', nodeText: 'Logout', iconCss: 'icon-chrome icon',
      },]
      this.field$.next({ dataSource: this.data, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'iconCss' ,routerLink:'url'});

  }
  }

  // Initialize the Dialog component target element.
  public initilaizeTarget: EmitType<object> = () => {
this.targetElement = this.container.nativeElement.parentElement;
  }
  public onOpenDialog = (event: any) =>{
  
    
  this.ejDialog.show();
  };
  // Sample level code to hide the Dialog when click the Dialog overlay
  public onOverlayClick: EmitType<object> = () => {
  this.ejDialog.hide();
 
  }
//   public onCreated(args: any) {
//     this.sidebar.element.style.visibility = '';
// }

  changeTitle(title: string) {
    this.title = title;
}
  logout() {
    if (window.confirm('are you sure you want to log out?')) {
    
      this.authService.logout();
  }
  }
  

  public onCreated(args: any) {
       this.sidebarTreeviewInstance.element.style.visibility = '';
       
    
  }
  public onClose(args: any) {
      this.treeviewInstance.collapseAll();
  }
  openClick() {
      if(this.sidebarTreeviewInstance.isOpen)
      {
          this.sidebarTreeviewInstance.hide();
          this.treeviewInstance.collapseAll();
      }
      else {
          this.sidebarTreeviewInstance.show();
          this.treeviewInstance.expandAll();
      }  
  }

   onNodeClicked(args:any){ 
    let data=this.treeviewInstance.getTreeData(args.node);
    // console.log('treeviewww.....',data)
    data.forEach(d=>{
      if(d.selected &&d.nodeId == '06'){
        this.logout();
      } 
      else if(d.selected && d.url){
     
      this.router.navigate([d.url])
      }
      else if(d.nodeChild){
      let children = d.nodeChild as Array<any>;
       children.forEach(child=>{
      if(child.selected){
       this.router.navigate([child.url])
        }  
      })
    }
    })
   
} 


}
