import { Component, AfterViewInit } from '@angular/core';
import { CostExplorerService } from '@app/services';

import * as Datamap from 'datamaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  public costAndUsageChartData:Array<any> = [];
  public costAndUsageChartLabels:Array<any> = [];
  public costAndUsageChartOptions:any = {
    responsive: true,
    scales: {
                    xAxes: [{
                        display: !0,
                        gridLines: {
                            display: !1
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            max: 40,
                            min: 0,
                            stepSize: .5
                        },
                        display: !1,
                        gridLines: {
                            display: !1
                        }
                    }]
                },
                legend: {
                    display: !1
                }
  };
  public costAndUsageChartType:string = 'line';

  public currentBill: number;
  public billUnit : string;
  public currentDate: string;
  
  public currentVPC: number = 0;
  public currentACL: number = 0;
  public currentSecurityGroup: number = 0;
  public currentNatGateway: number = 0;
  public currentInternetGateway: number = 0;
  public currentElasticIP: number = 0;
  public currentKeyPair: number = 0;
  public currentAutoscalingGroup: number = 0;
  public currentRouteTable: number = 0;
  public currentDynamoDBReadCapacity: number = 0;
  public currentDynamoDBWriteCapacity: number = 0;
  public currentDynamoDBTable: number = 0;
  public currentEBSVolumes: number = 0;
  public currentEBSSize: number = 0;
  public currentSnapshot: number = 0;
  public currentSnapshotSize: number = 0;
  public currentStoppedInstances: number = 0;
  public currentRunningInstances: number = 0;
  public currentTerminatedInstances: number = 0;
  public currentCSharpLambdaFunctions: number = 0;
  public currentJavaLambdaFunctions: number = 0;
  public currentGolangLambdaFunctions: number = 0;
  public currentPythonLambdaFunctions: number = 0;
  public currentNodeJSLambdaFunctions: number = 0;
  public currentS3Buckets: number = 0;
  public currentSQSQueues: number = 0;
  public currentSNSTopics: number = 0;
  public currentHostedZones: number = 0;

  public ec2FamilliesChartLabels:string[] = [];
  public ec2FamilliesChartData:number[] = [];
  public ec2FamilliesChartLegend:boolean = true;
  public ec2FamilliesOptions: any = {
    responsive: true
  }
 
  public ec2FamilliesChartType:string = 'polarArea';

  public doughnutChartOptions: any = {
    cutoutPercentage: 80
  }

  public barChartOptions:any = {
    responsive: true,
    scales: {
                xAxes: [{
                    display: !1
                }],
                yAxes: [{
                    display: !1
                }]
            },
            legend: {
                display: !1
            }
  };
  public elbFamiliesChartLabels:string[] = [];
  public elbFamiliesChartType:string = 'bar';
  public elbFamiliesChartData:any[] = [];

  public ebsFamiliesChartLabels:string[] = [];
  public ebsFamiliesChartData:number[] = [];
  public ebsFamiliesChartType:string = 'doughnut';
  public ebsFamiliesChartOptions: any = {
    cutoutPercentage: 80,
    legend: {
       display: 0
    }
  }

  private regions = {
    us_east_1 : {
      latitude : 39.3095135,
      longitude : -119.6499793 
    },
    us_east_2 : {
      latitude : 40.4172871,
      longitude : -82.907123
    },
    us_west_1 : {
      latitude : 36.778261,
      longitude : -119.4179324
    },
    us_west_2 : {
      latitude : 43.8041334,
      longitude : -120.5542012
    },
    ca_central_1 : {
      latitude : 51.253775,
      longitude : -85.323214
    },
    eu_central_1 : {
      latitude : 50.1109221,
      longitude : 8.6821267
    },
    eu_west_1 : {
      latitude : 53.4058314,
      longitude : -6.0624418
    },
    eu_west_2 : {
      latitude : 51.5073509,
      longitude : -0.1277583
    },
    eu_west_3 : {
      latitude : 48.856614,
      longitude : 2.3522219
    },
    ap_northeast_1 : {
      latitude : 35.6894875,
      longitude : 139.6917064
    },
    ap_northeast_2 : {
      latitude : 37.566535,
      longitude : 126.9779692
    },
    ap_northeast_3 : {
      latitude : 34.6937378,
      longitude : 135.5021651
    },
    ap_southeast_1 : {
      latitude : 1.3553794,
      longitude : 103.8677444
    },
    ap_southeast_2 : {
      latitude : -33.8688197,
      longitude : 151.2092955
    },
    ap_south_1 : {
      latitude : 19.0759837,
      longitude : 72.8776559
    },
    sa_east_1 : {
      latitude : -23.5505199,
      longitude : -46.6333094
    }
  }

  constructor(private costExplorerService: CostExplorerService){
    this.getCurrentVPC()
    this.getCurrentACL()
    this.getCurrentSecurityGroup()
    this.getCurrentNatGateway()
    this.getCurrentInternetGateway()
    this.getCurrentElasticIP()
    this.getCurrentKeyPair()
    this.getCurrentAutoscalingGroup()
    this.getCurrentRouteTable()
    this.getCurrentDynamoDBTable()
    this.getCurrentDynamoDBThroughput()
    this.getCurrentEBSFamily()
    this.getCurrentEC2Family()
    this.getCurrentEBSSize()
    this.getCurrentEC2State()
    this.getCurrentSnapshot()
    this.getCurrentSnapshotSize()
    this.getCostAndUsage()
    this.getCurrentLambdaRuntime()
    this.getCurrentELBFamily()
    this.getCurrentSQSQueues()
    this.getCurrentSNSTopics()
    this.getCurrentHostedZones()
  }

  private getCurrentVPC(): void {
    this.costExplorerService.getCurrentVPC().subscribe(current => {
      this.currentVPC = (current ? current : 0)
    })
  }

  private getCurrentACL(): void {
    this.costExplorerService.getCurrentACL().subscribe(current => {
      this.currentACL = (current ? current : 0)
    })
  }

  private getCurrentSecurityGroup(): void {
    this.costExplorerService.getCurrentSecurityGroup().subscribe(current => {
      this.currentSecurityGroup = (current ? current : 0)
    })
  }

  private getCurrentNatGateway(): void {
    this.costExplorerService.getCurrentNatGateway().subscribe(current => {
      this.currentNatGateway = (current ? current : 0)
    })
  }

  private getCurrentInternetGateway(): void {
    this.costExplorerService.getCurrentInternetGateway().subscribe(current => {
      this.currentInternetGateway = (current ? current : 0)
    })
  }

  private getCurrentElasticIP(): void {
    this.costExplorerService.getCurrentElasticIP().subscribe(current => {
      this.currentElasticIP = (current ? current : 0)
    })
  }

  private getCurrentKeyPair(): void {
    this.costExplorerService.getCurrentKeyPair().subscribe(current => {
      this.currentKeyPair = (current ? current : 0)
    })
  }

  private getCurrentAutoscalingGroup(): void {
    this.costExplorerService.getCurrentAutoscalingGroup().subscribe(current => {
      this.currentAutoscalingGroup = (current ? current : 0)
    })
  }

  private getCurrentRouteTable(): void {
    this.costExplorerService.getCurrentRouteTable().subscribe(current => {
      this.currentRouteTable = (current ? current : 0)
    })
  }

  private getCurrentDynamoDBTable(): void {
    this.costExplorerService.getCurrentDynamoDBTable().subscribe(current => {
      this.currentDynamoDBTable = (current ? current : 0)
    })
  }

  private getCurrentDynamoDBThroughput(): void {
    this.costExplorerService.getCurrentDynamoDBThroughput().subscribe(current => {
      this.currentDynamoDBReadCapacity = (current.readCapacity ? current.readCapacity : 0)
      this.currentDynamoDBWriteCapacity = (current.writeCapacity ? current.writeCapacity : 0)
    })
  }

  private getCurrentEBSFamily(): void {
    this.currentEBSVolumes = 0;
    this.costExplorerService.getCurrentEBSFamily().subscribe(res => {
      for(var ebs in res){
        this.currentEBSVolumes += res[ebs]
        this.ebsFamiliesChartData.push(res[ebs])
        this.ebsFamiliesChartLabels.push(ebs)
      }
    })
  }

  private getCurrentEC2Family(): void {
    this.costExplorerService.getCurrentEC2Family().subscribe(res => {
      for(var i in res){
        this.ec2FamilliesChartLabels.push(i)
        this.ec2FamilliesChartData.push(res[i])
      }
    })
  }

  private getCurrentEBSSize(): void {
    this.costExplorerService.getCurrentEBSSize().subscribe(current => {
      this.currentEBSSize = (current ? current : 0);
    })
  }

  public getCurrentEC2State(): void {
    this.costExplorerService.getCurrentEC2State().subscribe(res => {
      this.currentStoppedInstances = (res.stopped ? res.stopped : 0)
      this.currentTerminatedInstances = (res.terminated ? res.terminated : 0)
      this.currentRunningInstances = (res.running ? res.running : 0)
    })
  }

  private getCurrentSnapshot(): void {
    this.costExplorerService.getCurrentSnapshot().subscribe(current => {
      this.currentSnapshot = (current ? current : 0);
    })
  }

  private getCurrentSnapshotSize(): void {
    this.costExplorerService.getCurrentSnapshotSize().subscribe(current => {
      this.currentSnapshotSize = (current ? current : 0);
    })
  }

  private getCurrentS3Buckets(): void {
    this.costExplorerService.getCurrentS3Buckets().subscribe(current => {
      this.currentS3Buckets = (current ? current : 0);
    })
  }

  private getCurrentSQSQueues(): void {
    this.costExplorerService.getCurrentSQSQueues().subscribe(current => {
      this.currentSQSQueues = (current ? current : 0);
    })
  }

  private getCurrentSNSTopics(): void {
    this.costExplorerService.getCurrentSNSTopics().subscribe(current => {
      this.currentSNSTopics = (current ? current : 0);
    })
  }

  private getCurrentHostedZones(): void {
    this.costExplorerService.getCurrentHostedZones().subscribe(current => {
      this.currentHostedZones = (current ? current : 0);
    })
  }

  private getCurrentLambdaRuntime(): void {
    this.currentGolangLambdaFunctions = 0
    this.currentNodeJSLambdaFunctions = 0
    this.currentJavaLambdaFunctions = 0
    this.currentPythonLambdaFunctions = 0
    this.currentCSharpLambdaFunctions = 0
    this.costExplorerService.getCurrentLambdaRuntime().subscribe(res => {
      for(var runtime in res){
        if(runtime.startsWith('go')){
          this.currentGolangLambdaFunctions+=res[runtime]
        }
        if(runtime.startsWith('nodejs')){
          this.currentNodeJSLambdaFunctions+=res[runtime]
        }
        if(runtime.startsWith('java')){
          this.currentJavaLambdaFunctions+=res[runtime]
        }
        if(runtime.startsWith('python')){
          this.currentPythonLambdaFunctions+=res[runtime]
        }
        if(runtime.startsWith('dotnet')){
          this.currentCSharpLambdaFunctions+=res[runtime]
        }
      }
    })
  }

  private getCurrentELBFamily(): void {
    let data = []
    let labels = []
    this.costExplorerService.getCurrentELBFamily().subscribe(res => {
      for(var i in res){
        data.push(res[i])
        labels.push(i)
      }
      this.elbFamiliesChartData = [
          {
            label: "Total",
            borderWidth: 1,
            data: data
          }
      ]
      this.elbFamiliesChartLabels = labels
    })
  }

  private getCurrentEC2Region(): void {
    var map = new Datamap({
      scope: 'world',
      responsive: true,
      element: document.getElementById('map'),
      geographyConfig: {
        popupOnHover: false,
        highlightOnHover: false
      },
      fills: {
        defaultFill: '#ABDDA4',
        instance: 'red'
      }
    });
    let data = []
    this.costExplorerService.getCurrentEC2Region().subscribe(res => {
      for(var region in res){
        var params = this.regions[region.split("-").join("_")]
        data.push({
          radius: res[region] * 3,
          latitude: params.latitude,
          longitude: params.longitude,
          region: region,
          fillKey: 'instance',
          instances: res[region]
        })
      }
      map.bubbles(data, {
        popupTemplate: function(geo, data){
          return `<div class="hoverinfo">${data.region}: ${data.instances} EC2`
        }
      })
    })
  }


  private getCostAndUsage(): void {
    var values = []
    var labels = []
    this.costExplorerService.getBilling().subscribe(res => {
      this.currentBill = res[res.length - 1].Amount.toFixed(2)
      this.billUnit = res[res.length - 1].Unit;
      this.currentDate = `${(new Date().toLocaleString("en-us", { month: "long" }))} ${(new Date()).getFullYear()}`
      res.forEach(item => {
        values.push(item.Amount.toFixed(3))
        labels.push(new Date(item.End).toLocaleString("en-us", { month: "long" }))
      })
      this.costAndUsageChartData = [
        {
          label: "Bill",
          fill: 0,
          lineTension: 0,
          backgroundColor: "transparent",
          borderColor: "#6ccef0",
          pointBorderColor: "#59c2e6",
          pointHoverBackgroundColor: "#59c2e6",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: "miter",
          borderWidth: 3,
          pointBackgroundColor: "#59c2e6",
          pointBorderWidth: 0,
          pointHoverRadius: 4,
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 0,
          pointRadius: 4,
          pointHitRadius: 0,
          data: values,
          spanGaps: 1
        }
      ]
      this.costAndUsageChartLabels = labels
    }) 
  }

  ngAfterViewInit(){
    this.getCurrentEC2Region();
  }
}
