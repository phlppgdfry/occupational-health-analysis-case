from pathlib import Path
import json
import xml.etree.ElementTree as ET
R=Path(__file__).resolve().parent.parent
base={'version':{'type':'integer','minimum':1},'key':{'type':'string','minLength':1,'maxLength':100}}
actions={'Complete':('complete',{'type':{'type':'string','enum':['periodic','intake']},'workpost':{'type':'string','minLength':1,'maxLength':80}}),'Schedule':('schedule',{'slotId':{'type':'string','minLength':1}}),'Cancel':('cancel',{'reason':{'type':'string','minLength':1,'maxLength':160}}),'Reopen':('reopen',{}),'Outcome':('outcome',{'outcome':{'type':'string','enum':['completed','no_show']}})}
schemas={}
for name,(action,fields) in actions.items():
    props={'action':{'type':'string','enum':[action]},**base,**fields}
    schemas[name]={'type':'object','additionalProperties':False,'required':list(props),'properties':props}
schemas['Request']={'type':'object','required':['id','employee','employer','type','workpost','status','version','slotId'],'properties':{'id':{'type':'string'},'employee':{'type':'string'},'employer':{'type':'string'},'type':{'type':'string','enum':['periodic','intake']},'workpost':{'type':'string'},'status':{'type':'string','enum':['incomplete','ready','scheduled','cancelled','completed','no_show']},'version':{'type':'integer','minimum':1},'slotId':{'type':['string','null']}}}
schemas['CommandResult']={'type':'object','required':['request','replayed'],'properties':{'request':{'$ref':'#/components/schemas/Request'},'replayed':{'type':'boolean'}}}
schemas['Error']={'type':'object','required':['code','message'],'properties':{'code':{'type':'string'},'message':{'type':'string'},'correlationId':{'type':'string'}}}
param={'name':'requestId','in':'path','required':True,'schema':{'type':'string'},'description':'Administrative request identifier; tenant authorization is server-side.'}
def response(desc,schema):return {'description':desc,'content':{'application/json':{'schema':schema}}}
err={'$ref':'#/components/schemas/Error'}
api={'openapi':'3.1.1','info':{'title':'Aster administrative scheduling - design contract','version':'1.0.0','license':{'name':'CC BY 4.0','url':'https://creativecommons.org/licenses/by/4.0/'},'description':'Fictional portfolio API design. No backend implemented. Role comes from verified identity, not command payload.'},'servers':[{'url':'https://api.example.invalid/v1','description':'Design placeholder only'}],'security':[{'bearerAuth':[]}],'tags':[{'name':'Requests','description':'Administrative request commands'}],'paths':{'/requests/{requestId}':{'get':{'tags':['Requests'],'summary':'Read one administrative request','operationId':'getRequest','parameters':[param],'responses':{'200':response('Current request',{'$ref':'#/components/schemas/Request'}),'401':response('Missing identity',err),'403':response('Outside authorized scope',err),'404':response('Request not found',err)}}},'/requests/{requestId}/commands':{'post':{'tags':['Requests'],'summary':'Apply a versioned, idempotent command','operationId':'executeCommand','parameters':[param],'requestBody':{'required':True,'content':{'application/json':{'schema':{'oneOf':[{'$ref':'#/components/schemas/'+n} for n in actions]},'example':{'action':'cancel','version':3,'key':'client-9e08','reason':'Medewerker verhinderd'}}}},'responses':{'200':response('Committed or replayed command',{'$ref':'#/components/schemas/CommandResult'}),'401':response('Missing identity',err),'403':response('Role or scope denied',err),'404':response('Request not found',err),'409':response('STALE_VERSION, SLOT_CONFLICT or KEY_REUSED',err),'422':response('Validation, status or time rule rejected',err),'503':response('Temporary service failure; retry identical key and payload',err)}}}},'components':{'securitySchemes':{'bearerAuth':{'type':'http','scheme':'bearer','description':'Production only: identity and tenant verified server-side.'}},'schemas':schemas}}
(R/'data/openapi.json').write_text(json.dumps(api,indent=2,ensure_ascii=False)+'\n')
# BPMN with explicit lanes, conditions and diagram interchange. Non-executable.
B='http://www.omg.org/spec/BPMN/20100524/MODEL';D='http://www.omg.org/spec/BPMN/20100524/DI';DC='http://www.omg.org/spec/DD/20100524/DC';DI='http://www.omg.org/spec/DD/20100524/DI';X='http://www.w3.org/2001/XMLSchema-instance'
for prefix,ns in [('bpmn',B),('bpmndi',D),('dc',DC),('di',DI),('xsi',X)]:ET.register_namespace(prefix,ns)
def element(parent,ns,tag,attrs=None,text=None):
    e=ET.SubElement(parent,'{'+ns+'}'+tag,attrs or {})
    if text is not None:e.text=text
    return e
root=ET.Element('{'+B+'}definitions',{'id':'Definitions_Aster','targetNamespace':'https://example.invalid/aster','exporter':'Aster portfolio model generator','exporterVersion':'1.0'})
process=element(root,B,'process',{'id':'Process_Planning','name':'Administratieve planning en opvolging','isExecutable':'false'})
lanes=element(process,B,'laneSet',{'id':'LaneSet_1'})
planner=element(lanes,B,'lane',{'id':'Lane_Planner','name':'Planner'})
coord=element(lanes,B,'lane',{'id':'Lane_Coordinator','name':'Coördinator'})
items=[('startEvent','Start','Aanvraag ontvangen',90,120,36,36),('userTask','Check','Controleer en vul gegevens aan',160,100,150,75),('exclusiveGateway','Complete','Volledig?',365,112,50,50),('userTask','Choose','Kies passend tijdslot',465,100,145,75),('serviceTask','Reserve','Controleer en reserveer',675,100,145,75),('exclusiveGateway','Free','Boeking gelukt?',870,112,50,50),('eventBasedGateway','Wait','Wacht op vervolg',970,112,50,50),('intermediateCatchEvent','CancelEvent','Annulering gevraagd',1030,240,36,36),('serviceTask','Cancel','Annuleer en geef vrij',890,220,135,75),('userTask','Reopen','Heropen voor herplanning',675,220,145,75),('intermediateCatchEvent','Ended','Afspraak afgelopen',1060,390,36,36),('userTask','Outcome','Registreer administratieve uitkomst',870,365,155,80),('endEvent','End','Afgesloten',760,388,36,36)]
for typ,id,name,x,y,w,h in items:
    n=element(process,B,typ,{'id':id,'name':name})
    if id=='CancelEvent':element(n,B,'messageEventDefinition',{'id':'Message_Cancel_Def','messageRef':'Message_Cancel'})
    if id=='Ended':element(n,B,'timerEventDefinition',{'id':'Timer_End_Def'})
    lane=coord if id in ['Ended','Outcome','End'] else planner
    element(lane,B,'flowNodeRef',text=id)
# Default branches reference actual sequence flows.
process.find('{'+B+'}exclusiveGateway').set('default','F_Incomplete')
process.findall('{'+B+'}exclusiveGateway')[1].set('default','F_Conflict')
flows=[('F_Start','Start','Check','',None),('F_Check','Check','Complete','',None),('F_Incomplete','Complete','Check','Onvolledig',None),('F_Complete','Complete','Choose','Volledig','complete'),('F_Choose','Choose','Reserve','',None),('F_Reserve','Reserve','Free','',None),('F_Conflict','Free','Choose','Conflict',None),('F_Free','Free','Wait','Bevestigd','reserved'),('F_CancelMessage','Wait','CancelEvent','',None),('F_Elapsed','Wait','Ended','',None),('F_Cancel','CancelEvent','Cancel','',None),('F_Reopen','Cancel','Reopen','Herplanning gewenst',None),('F_Replan','Reopen','Choose','',None),('F_Outcome','Ended','Outcome','',None),('F_End','Outcome','End','',None)]
# An explicit end branch for cancellations that require no replanning.
choice=element(process,B,'exclusiveGateway',{'id':'ReplanChoice','name':'Herplannen?','default':'F_NoReplan'});element(planner,B,'flowNodeRef',text='ReplanChoice')
cancelEnd=element(process,B,'endEvent',{'id':'CancelEnd','name':'Geannuleerd behouden'});element(planner,B,'flowNodeRef',text='CancelEnd')
flows=[f for f in flows if f[0]!='F_Reopen']+[('F_AfterCancel','Cancel','ReplanChoice','',None),('F_Reopen','ReplanChoice','Reopen','Ja','replanningRequested'),('F_NoReplan','ReplanChoice','CancelEnd','Nee',None)]
nodeMap={e.attrib['id']:e for e in process if 'id' in e.attrib}
for id,s,t,name,condition in flows:
    f=element(process,B,'sequenceFlow',{'id':id,'sourceRef':s,'targetRef':t,**({'name':name} if name else {})})
    if condition:element(f,B,'conditionExpression',{'{'+X+'}type':'bpmn:tFormalExpression'},condition)
    element(nodeMap[s],B,'outgoing',text=id);element(nodeMap[t],B,'incoming',text=id)
element(root,B,'message',{'id':'Message_Cancel','name':'Administratief annuleringsverzoek'})
collab=element(root,B,'collaboration',{'id':'Collaboration_Aster'});element(collab,B,'participant',{'id':'Participant_Aster','name':'Aster Preventie','processRef':'Process_Planning'})
diagram=element(root,D,'BPMNDiagram',{'id':'Diagram_Planning'});plane=element(diagram,D,'BPMNPlane',{'id':'Plane_Planning','bpmnElement':'Collaboration_Aster'})
def shape(id,x,y,w,h,horizontal=None):
    attrs={'id':'Shape_'+id,'bpmnElement':id}
    if horizontal is not None:attrs['isHorizontal']=str(horizontal).lower()
    sh=element(plane,D,'BPMNShape',attrs);element(sh,DC,'Bounds',{'x':str(x),'y':str(y),'width':str(w),'height':str(h)})
shape('Participant_Aster',20,40,1190,450,True);shape('Lane_Planner',50,40,1160,285,True);shape('Lane_Coordinator',50,325,1160,165,True)
positions={id:(x,y,w,h) for _,id,_,x,y,w,h in items};positions['ReplanChoice']=(805,232,50,50);positions['CancelEnd']=(1120,242,36,36)
for id,(x,y,w,h) in positions.items():shape(id,x,y,w,h)
for id,s,t,_,_ in flows:
    sx,sy,sw,sh=positions[s];tx,ty,tw,th=positions[t];edge=element(plane,D,'BPMNEdge',{'id':'Edge_'+id,'bpmnElement':id})
    if id in ['F_Incomplete','F_Conflict']:
        pts=[(sx+sw/2,sy),(sx+sw/2,65),(tx+tw/2,65),(tx+tw/2,ty)]
    elif id=='F_Replan':pts=[(sx+sw/2,sy),(sx+sw/2,190),(tx+tw/2,190),(tx+tw/2,ty+th)]
    else:pts=[(sx+sw/2,sy+sh/2),(tx+tw/2,ty+th/2)]
    for x,y in pts:element(edge,DI,'waypoint',{'x':str(x),'y':str(y)})
for n in process:
    ordered=sorted(list(n),key=lambda e: 0 if e.tag.endswith('incoming') else 1 if e.tag.endswith('outgoing') else 2)
    n[:]=ordered
ET.indent(root);ET.ElementTree(root).write(R/'docs/diagrams/to-be.bpmn',encoding='utf-8',xml_declaration=True)
svg='''<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="330" viewBox="0 0 1100 330"><title>Administratieve planning: controle, reservering en herplanning</title><defs><marker id="a" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0 0L7 3L0 6" fill="#087e83"/></marker></defs><rect width="1100" height="330" fill="#f5f7fa"/><g fill="#fff" stroke="#b7cbd0" stroke-width="1.5"><rect x="30" y="70" width="180" height="80" rx="6"/><rect x="275" y="70" width="200" height="80" rx="6"/><rect x="545" y="70" width="220" height="80" rx="6"/><rect x="835" y="70" width="220" height="80" rx="6"/><rect x="545" y="225" width="220" height="70" rx="6"/><rect x="275" y="225" width="200" height="70" rx="6"/></g><g font-family="Arial,sans-serif" fill="#172e3a" font-size="19" text-anchor="middle"><text x="120" y="110">Aanvraag</text><text x="375" y="110">Gegevens compleet?</text><text x="655" y="104">Passend tijdslot</text><text x="655" y="128">en resources vrij?</text><text x="945" y="110">Afspraak bevestigd</text><text x="655" y="268">Annuleren: slot vrij</text><text x="375" y="268">Expliciet heropenen</text></g><g stroke="#087e83" stroke-width="2" fill="none" marker-end="url(#a)"><path d="M210 110H275"/><path d="M475 110H545"/><path d="M765 110H835"/><path d="M945 150V260H765"/><path d="M545 260H475"/><path d="M375 225V190H655V150"/></g><g font-family="Arial,sans-serif" fill="#526981" font-size="14"><text x="30" y="38">Procesoverzicht - fictieve administratieve module</text><text x="300" y="173">Onvolledig: eerst aanvullen</text><text x="580" y="173">Conflict: ander slot kiezen</text><text x="845" y="193">Na afloop: uitkomst door coördinator</text><text x="30" y="315">SVG-overzicht. De volledige BPMN-notatie met lanes en uitzonderingspaden staat in to-be.bpmn.</text></g></svg>'''
(R/'docs/diagrams/to-be.svg').write_text(svg)
print('API contract, non-executable BPMN with DI and overview created.')
