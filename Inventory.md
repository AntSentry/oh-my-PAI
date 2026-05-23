# Inventory — Audited PAI v5.0.0 Surfaces

Source repo: https://github.com/danielmiessler/Personal_AI_Infrastructure.git
Revision: `2fde1bbe9e8f280cd4998e244b53e3c66f3dc8b9`
Audited release root: `/tmp/pai-latest-audit/Releases/v5.0.0/.claude`

## Skills and workflows

| Skill | Workflows | Workflow names | Tools | Tool names |
|---|---:|---|---:|---|
| Agents | 5 | CreateCustomAgent<br>ListTraits<br>SpawnObservers<br>SpawnParallelAgents<br>SpawnTeam | 2 | ComposeAgent.ts<br>LoadAgentContext.ts |
| ApertureOscillation | 1 | Oscillate | 0 | — |
| Aphorisms | 4 | AddAphorism<br>FindAphorism<br>ResearchThinker<br>SearchAphorisms | 0 | — |
| Apify | 1 | Update | 0 | — |
| ArXiv | 3 | Latest<br>Paper<br>Search | 0 | — |
| Art | 21 | AdHocYouTubeThumbnail<br>AnnotatedScreenshots<br>Aphorisms<br>Comics<br>Comparisons<br>CreatePAIPackIcon<br>D3Dashboards<br>EmbossedLogoWallpaper<br>Essay<br>Frameworks<br>LogoWallpaper<br>Maps<br>Mermaid<br>RecipeCards<br>RemoveBackground<br>Stats<br>Taxonomies<br>TechnicalDiagrams<br>Timelines<br>Visualize<br>YouTubeThumbnailChecklist | 5 | ComposeThumbnail.ts<br>FillFrame.ts<br>Generate.ts<br>GenerateMidjourneyImage.ts<br>GeneratePrompt.ts |
| AudioEditor | 1 | Clean | 5 | Analyze.ts<br>Edit.ts<br>Pipeline.ts<br>Polish.ts<br>Transcribe.ts |
| BeCreative | 7 | DomainSpecific<br>IdeaGeneration<br>MaximumCreativity<br>StandardCreativity<br>SyntheticDataExpansion<br>TechnicalCreativityGemini3<br>TreeOfThoughts | 0 | — |
| BitterPillEngineering | 2 | Audit<br>QuickCheck | 0 | — |
| BrightData | 2 | Crawl<br>FourTierScrape | 0 | — |
| Browser | 3 | Automate<br>ReviewStories<br>Update | 0 | — |
| ContextSearch | 0 | — | 0 | — |
| Council | 2 | Debate<br>Quick | 0 | — |
| CreateCLI | 3 | AddCommand<br>CreateCli<br>UpgradeTier | 0 | — |
| CreateSkill | 7 | CanonicalizeSkill<br>CreateSkill<br>ImproveSkill<br>OptimizeDescription<br>TestSkill<br>UpdateSkill<br>ValidateSkill | 0 | — |
| Daemon | 4 | DeployDaemon<br>PreviewDaemon<br>ReadDaemon<br>UpdateDaemon | 2 | DaemonAggregator.ts<br>SecurityFilter.ts |
| Delegation | 0 | — | 0 | — |
| Evals | 8 | CompareModels<br>ComparePrompts<br>CreateJudge<br>CreateScenario<br>CreateUseCase<br>RunEval<br>RunScenario<br>ViewResults | 8 | AlgorithmBridge.ts<br>FailureToTask.ts<br>PAIAgentAdapter.ts<br>ScenarioRunner.ts<br>ScenarioToTranscript.ts<br>SuiteManager.ts<br>TranscriptCapture.ts<br>TrialRunner.ts |
| ExtractWisdom | 1 | Extract | 0 | — |
| Fabric | 2 | ExecutePattern<br>UpdatePatterns | 0 | — |
| FirstPrinciples | 3 | Challenge<br>Deconstruct<br>Reconstruct | 0 | — |
| ISA | 6 | Append<br>CheckCompleteness<br>Interview<br>Reconcile<br>Scaffold<br>Seed | 0 | — |
| Ideate | 6 | Dream<br>FullCycle<br>Mate<br>QuickCycle<br>Steal<br>Test | 0 | — |
| Interceptor | 6 | RecordFlow<br>ReplayFlow<br>Reproduce<br>TestForm<br>Update<br>VerifyDeploy | 0 | — |
| Interview | 0 | — | 0 | — |
| IterativeDepth | 1 | Explore | 0 | — |
| Knowledge | 0 | — | 0 | — |
| Loop | 0 | — | 0 | — |
| Migrate | 0 | — | 0 | — |
| Optimize | 0 | — | 0 | — |
| PAIUpgrade | 5 | AlgorithmUpgrade<br>FindSources<br>MineReflections<br>ResearchUpgrade<br>Upgrade | 1 | Anthropic.ts |
| PrivateInvestigator | 5 | FindPerson<br>PublicRecordsSearch<br>ReverseLookup<br>SocialMediaSearch<br>VerifyIdentity | 0 | — |
| Prompting | 0 | — | 6 | RenderTemplate.ts<br>ValidateTemplate.ts<br>index.ts<br>RenderTemplate.ts<br>ValidateTemplate.ts<br>index.ts |
| RedTeam | 2 | AdversarialValidation<br>ParallelAnalysis | 0 | — |
| Remotion | 2 | ContentToAnimation<br>GeneratedContentVideo | 2 | Render.ts<br>Theme.ts |
| Research | 15 | AnalyzeAiTrends<br>ClaudeResearch<br>DeepInvestigation<br>Enhance<br>ExtensiveResearch<br>ExtractAlpha<br>ExtractKnowledge<br>Fabric<br>InterviewResearch<br>QuickResearch<br>Retrieve<br>StandardResearch<br>Verify<br>WebScraping<br>YoutubeExtraction | 0 | — |
| RootCauseAnalysis | 5 | FaultTree<br>Fishbone<br>FiveWhys<br>KepnerTregoe<br>Postmortem | 0 | — |
| Sales | 3 | CreateNarrative<br>CreateSalesPackage<br>CreateVisual | 0 | — |
| Science | 9 | AnalyzeResults<br>DefineGoal<br>DesignExperiment<br>FullCycle<br>GenerateHypotheses<br>Iterate<br>MeasureResults<br>QuickDiagnosis<br>StructuredInvestigation | 0 | — |
| SystemsThinking | 5 | CausalLoop<br>ConceptMap<br>FindArchetype<br>FindLeverage<br>Iceberg | 0 | — |
| Telos | 4 | CreateNarrativePoints<br>InterviewExtraction<br>Update<br>WriteReport | 1 | UpdateTelos.ts |
| USMetrics | 2 | GetCurrentState<br>UpdateData | 3 | FetchFredSeries.ts<br>GenerateAnalysis.ts<br>UpdateSubstrateMetrics.ts |
| Webdesign | 7 | CreatePrototype<br>DeployDesign<br>ExportToCode<br>ExtractDesignSystem<br>IntegrateIntoApp<br>RefinePrototype<br>WebsiteToRedesign | 3 | DriveClaudeDesign.ts<br>ProcessHandoffBundle.ts<br>VerifyDesign.ts |
| WorldThreatModel | 3 | TestIdea<br>UpdateModels<br>ViewModels | 0 | — |
| WriteStory | 5 | BuildBible<br>Explore<br>Interview<br>Revise<br>WriteChapter | 0 | — |

## Agents

| Agent | Source | OMP analog representation |
|---|---|---|
| Algorithm | `Algorithm.md` | Lazy AgentDefinition; eager summary only |
| Anvil | `Anvil.md` | Lazy AgentDefinition; eager summary only |
| Architect | `Architect.md` | Lazy AgentDefinition; eager summary only |
| Arthur | `Arthur.md` | Lazy AgentDefinition; eager summary only |
| Artist | `Artist.md` | Lazy AgentDefinition; eager summary only |
| BrowserAgent | `BrowserAgent.md` | Lazy AgentDefinition; eager summary only |
| Cato | `Cato.md` | Lazy AgentDefinition; eager summary only |
| ClaudeResearcher | `ClaudeResearcher.md` | Lazy AgentDefinition; eager summary only |
| CodexResearcher | `CodexResearcher.md` | Lazy AgentDefinition; eager summary only |
| Designer | `Designer.md` | Lazy AgentDefinition; eager summary only |
| Engineer | `Engineer.md` | Lazy AgentDefinition; eager summary only |
| Forge | `Forge.md` | Lazy AgentDefinition; eager summary only |
| GeminiResearcher | `GeminiResearcher.md` | Lazy AgentDefinition; eager summary only |
| GrokResearcher | `GrokResearcher.md` | Lazy AgentDefinition; eager summary only |
| PerplexityResearcher | `PerplexityResearcher.md` | Lazy AgentDefinition; eager summary only |
| QATester | `QATester.md` | Lazy AgentDefinition; eager summary only |
| Silas | `Silas.md` | Lazy AgentDefinition; eager summary only |
| UIReviewer | `UIReviewer.md` | Lazy AgentDefinition; eager summary only |

## Slash commands

| Command | Source | OMP analog representation |
|---|---|---|
| /context-search | `context-search.md` | Lazy command body; dispatcher metadata only |
| /cs | `cs.md` | Lazy command body; dispatcher metadata only |
| /pu | `pu.md` | Lazy command body; dispatcher metadata only |

## Hook/support files

| Hook file | Source | OMP analog representation |
|---|---|---|
| AgentInvocation.hook.ts | `AgentInvocation.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| CheckpointPerISC.hook.ts | `CheckpointPerISC.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| ConfigAudit.hook.ts | `ConfigAudit.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| ContainmentGuard.hook.ts | `ContainmentGuard.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| ContentScanner.hook.ts | `ContentScanner.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| ContextReduction.hook.sh | `ContextReduction.hook.sh` | Lazy hook module; subscribed through TriggerGraph |
| DocIntegrity.hook.ts | `DocIntegrity.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| ElicitationHandler.hook.ts | `ElicitationHandler.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| FileChanged.hook.ts | `FileChanged.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| ISASync.hook.ts | `ISASync.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| InstructionsLoadedHandler.hook.ts | `InstructionsLoadedHandler.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| IntegrityCheck.hook.ts | `IntegrityCheck.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| KVSync.hook.ts | `KVSync.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| KittyEnvPersist.hook.ts | `KittyEnvPersist.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| LastResponseCache.hook.ts | `LastResponseCache.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| LoadContext.hook.ts | `LoadContext.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| PreCompact.hook.ts | `PreCompact.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| PromptGuard.hook.ts | `PromptGuard.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| PromptProcessing.hook.ts | `PromptProcessing.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| QuestionAnswered.hook.ts | `QuestionAnswered.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| RelationshipMemory.hook.ts | `RelationshipMemory.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| RepeatDetection.hook.ts | `RepeatDetection.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| ResponseTabReset.hook.ts | `ResponseTabReset.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| RestoreContext.hook.ts | `RestoreContext.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| SatisfactionCapture.hook.ts | `SatisfactionCapture.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| SecurityPipeline.hook.ts | `SecurityPipeline.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| SessionCleanup.hook.ts | `SessionCleanup.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| SetQuestionTab.hook.ts | `SetQuestionTab.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| SmartApprover.hook.ts | `SmartApprover.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| StopFailureHandler.hook.ts | `StopFailureHandler.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| TaskGovernance.hook.ts | `TaskGovernance.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| TeammateIdle.hook.ts | `TeammateIdle.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| TelosSummarySync.hook.ts | `TelosSummarySync.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| ToolActivityTracker.hook.ts | `ToolActivityTracker.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| ToolFailureTracker.hook.ts | `ToolFailureTracker.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| UpdateCounts.hook.ts | `UpdateCounts.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| VoiceCompletion.hook.ts | `VoiceCompletion.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| WorkCompletionLearning.hook.ts | `WorkCompletionLearning.hook.ts` | Lazy hook module; subscribed through TriggerGraph |
| DocCrossRefIntegrity.ts | `handlers/DocCrossRefIntegrity.ts` | Lazy hook module; subscribed through TriggerGraph |
| RebuildArchSummary.ts | `handlers/RebuildArchSummary.ts` | Lazy hook module; subscribed through TriggerGraph |
| SystemIntegrity.ts | `handlers/SystemIntegrity.ts` | Lazy hook module; subscribed through TriggerGraph |
| TabState.ts | `handlers/TabState.ts` | Lazy hook module; subscribed through TriggerGraph |
| UpdateCounts.ts | `handlers/UpdateCounts.ts` | Lazy hook module; subscribed through TriggerGraph |
| VoiceNotification.ts | `handlers/VoiceNotification.ts` | Lazy hook module; subscribed through TriggerGraph |
| change-detection.ts | `lib/change-detection.ts` | Lazy hook module; subscribed through TriggerGraph |
| containment-zones.ts | `lib/containment-zones.ts` | Lazy hook module; subscribed through TriggerGraph |
| hook-io.ts | `lib/hook-io.ts` | Lazy hook module; subscribed through TriggerGraph |
| identity.ts | `lib/identity.ts` | Lazy hook module; subscribed through TriggerGraph |
| isa-template.ts | `lib/isa-template.ts` | Lazy hook module; subscribed through TriggerGraph |
| isa-utils.ts | `lib/isa-utils.ts` | Lazy hook module; subscribed through TriggerGraph |
| learning-readback.ts | `lib/learning-readback.ts` | Lazy hook module; subscribed through TriggerGraph |
| learning-utils.ts | `lib/learning-utils.ts` | Lazy hook module; subscribed through TriggerGraph |
| log-rotation.ts | `lib/log-rotation.ts` | Lazy hook module; subscribed through TriggerGraph |
| notifications.ts | `lib/notifications.ts` | Lazy hook module; subscribed through TriggerGraph |
| observability-transport.ts | `lib/observability-transport.ts` | Lazy hook module; subscribed through TriggerGraph |
| output-validators.ts | `lib/output-validators.ts` | Lazy hook module; subscribed through TriggerGraph |
| paths.ts | `lib/paths.ts` | Lazy hook module; subscribed through TriggerGraph |
| tab-constants.ts | `lib/tab-constants.ts` | Lazy hook module; subscribed through TriggerGraph |
| tab-setter.ts | `lib/tab-setter.ts` | Lazy hook module; subscribed through TriggerGraph |
| time.ts | `lib/time.ts` | Lazy hook module; subscribed through TriggerGraph |
| EgressInspector.ts | `security/inspectors/EgressInspector.ts` | Lazy hook module; subscribed through TriggerGraph |
| InjectionInspector.ts | `security/inspectors/InjectionInspector.ts` | Lazy hook module; subscribed through TriggerGraph |
| PatternInspector.ts | `security/inspectors/PatternInspector.ts` | Lazy hook module; subscribed through TriggerGraph |
| PromptInspector.ts | `security/inspectors/PromptInspector.ts` | Lazy hook module; subscribed through TriggerGraph |
| RulesInspector.ts | `security/inspectors/RulesInspector.ts` | Lazy hook module; subscribed through TriggerGraph |
| logger.ts | `security/logger.ts` | Lazy hook module; subscribed through TriggerGraph |
| pipeline.ts | `security/pipeline.ts` | Lazy hook module; subscribed through TriggerGraph |
| types.ts | `security/types.ts` | Lazy hook module; subscribed through TriggerGraph |

## PAI tools

| Tool file | Source | OMP analog representation |
|---|---|---|
| ActivityParser.ts | `ActivityParser.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| AddBg.ts | `AddBg.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| AgentWatchdog.ts | `AgentWatchdog.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| AlgorithmPhaseReport.ts | `AlgorithmPhaseReport.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| AnvilProgress.ts | `AnvilProgress.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| ApproveCurrentStateEntries.ts | `ApproveCurrentStateEntries.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| ArchitectureSummaryGenerator.ts | `ArchitectureSummaryGenerator.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| Arthur.ts | `Arthur.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| Banner.ts | `Banner.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| BannerMatrix.ts | `BannerMatrix.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| BannerNeofetch.ts | `BannerNeofetch.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| BannerPrototypes.ts | `BannerPrototypes.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| BannerRetro.ts | `BannerRetro.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| BannerTokyo.ts | `BannerTokyo.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| BillingPathAssertion.ts | `BillingPathAssertion.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| Checkpoint.ts | `Checkpoint.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| ComputeGap.ts | `ComputeGap.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| CostTracker.ts | `CostTracker.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| CrossVendorAudit.ts | `CrossVendorAudit.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| DAGrowth.ts | `DAGrowth.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| DAIdentityGenerator.ts | `DAIdentityGenerator.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| DAInterview.ts | `DAInterview.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| DASchedule.ts | `DASchedule.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| DocCheck.ts | `DocCheck.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| ExtractTranscript.ts | `ExtractTranscript.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| FailureCapture.ts | `FailureCapture.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| FeatureRegistry.ts | `FeatureRegistry.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| ForgeProgress.ts | `ForgeProgress.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| GenerateTelosSummary.ts | `GenerateTelosSummary.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| GetCounts.ts | `GetCounts.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| GetTranscript.ts | `GetTranscript.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| HarvestExecutor.ts | `HarvestExecutor.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| HealthSnapshot.ts | `HealthSnapshot.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| Inference.ts | `Inference.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| IntegrityMaintenance.ts | `IntegrityMaintenance.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| InterviewIdealState.ts | `InterviewIdealState.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| InterviewScan.ts | `InterviewScan.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| KnowledgeGraph.ts | `KnowledgeGraph.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| KnowledgeHarvester.ts | `KnowledgeHarvester.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| LearningPatternSynthesis.ts | `LearningPatternSynthesis.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| LoadSkillConfig.ts | `LoadSkillConfig.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| MemoryRetriever.ts | `MemoryRetriever.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| MigrateApprove.ts | `MigrateApprove.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| MigrateScan.ts | `MigrateScan.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| NeofetchBanner.ts | `NeofetchBanner.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| OpinionTracker.ts | `OpinionTracker.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| PAILogo.ts | `PAILogo.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| PipelineMonitor.ts | `PipelineMonitor.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| PipelineOrchestrator.ts | `PipelineOrchestrator.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| PreviewMarkdown.ts | `PreviewMarkdown.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| ProposeCurrentStateEntry.ts | `ProposeCurrentStateEntry.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| Recommend.ts | `Recommend.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| ReferenceCheck.ts | `ReferenceCheck.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| RelationshipReflect.ts | `RelationshipReflect.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| RemoveBg.ts | `RemoveBg.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| SecretScan.ts | `SecretScan.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| SessionHarvester.ts | `SessionHarvester.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| SessionProgress.ts | `SessionProgress.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| SplitAndTranscribe.ts | `SplitAndTranscribe.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| TlpArchive.ts | `TlpArchive.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| TranscriptParser.ts | `TranscriptParser.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| WisdomCrossFrameSynthesizer.ts | `WisdomCrossFrameSynthesizer.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| WisdomDomainClassifier.ts | `WisdomDomainClassifier.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| WisdomFrameUpdater.ts | `WisdomFrameUpdater.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| YouTubeApi.ts | `YouTubeApi.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| algorithm.ts | `algorithm.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| gmail.ts | `gmail.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| pai.ts | `pai.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| eslint.config.js | `pipeline-monitor-ui/eslint.config.js` | Lazy tool adapter; exact implementation loaded on dispatch |
| utils.ts | `pipeline-monitor-ui/src/lib/utils.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| vite-env.d.ts | `pipeline-monitor-ui/src/vite-env.d.ts` | Lazy tool adapter; exact implementation loaded on dispatch |
| vite.config.ts | `pipeline-monitor-ui/vite.config.ts` | Lazy tool adapter; exact implementation loaded on dispatch |

## TypeScript function/symbol index

| File | Symbols |
|---|---|
| `hooks/CheckpointPerISC.hook.ts` | `commitInRepo`, `emitContinueAndExit`, `expandPath`, `gitRun`, `hasChanges`, `isGitRepo`, `loadAllowlist`, `loadState`, `main`, `sanitizeMessage`, `saveState` |
| `hooks/ToolActivityTracker.hook.ts` | `captureGroundTruth`, `gitSnapshot`, `main`, `readStdin`, `tools`, `truncate` |
| `hooks/PromptGuard.hook.ts` | `main` |
| `hooks/DocIntegrity.hook.ts` | `main` |
| `hooks/ContentScanner.hook.ts` | `main` |
| `hooks/RestoreContext.hook.ts` | `extractSections`, `loadSettings`, `main`, `safeRead` |
| `hooks/SecurityPipeline.hook.ts` | `main` |
| `hooks/RelationshipMemory.hook.ts` | `analyzeForRelationship`, `ensureRelationshipDir`, `formatNotes`, `initDailyFile`, `main`, `readStdinWithTimeout`, `readTranscriptEntries` |
| `hooks/QuestionAnswered.hook.ts` | `main` |
| `hooks/ConfigAudit.hook.ts` | `diffSettings`, `main`, `readStdin` |
| `hooks/security/pipeline.ts` | `InspectorPipeline` |
| `hooks/security/types.ts` | `alert`, `deny`, `requireApproval` |
| `hooks/security/logger.ts` | `logSecurityEvent`, `slugify`, `timestamp` |
| `hooks/security/inspectors/PatternInspector.ts` | `PatternInspector`, `createPatternInspector`, `expandTilde`, `extractCommand`, `extractFilePath`, `getFileAction`, `inspectBash`, `inspectPath`, `loadPatterns`, `matchesBashPattern`, `matchesPathPattern`, `stripEnvVarPrefix` |
| `hooks/security/inspectors/RulesInspector.ts` | `RulesInspector`, `cacheKey`, `createRulesInspector`, `extractToolInput` |
| `hooks/security/inspectors/InjectionInspector.ts` | `InjectionInspector`, `createInjectionInspector` |
| `hooks/security/inspectors/PromptInspector.ts` | `PromptInspector`, `createPromptInspector` |
| `hooks/security/inspectors/EgressInspector.ts` | `EgressInspector`, `createEgressInspector` |
| `hooks/StopFailureHandler.hook.ts` | `main` |
| `hooks/VoiceCompletion.hook.ts` | `extractFallbackSummary`, `isMainSession`, `main` |
| `hooks/TeammateIdle.hook.ts` | `main`, `readStdin` |
| `hooks/InstructionsLoadedHandler.hook.ts` | `appendIntegrityLog`, `hashFile`, `loadStoredHashes`, `main`, `saveHashes` |
| `hooks/ISASync.hook.ts` | `main` |
| `hooks/ContainmentGuard.hook.ts` | `extractScanTargets`, `findMatch`, `isFileContained`, `isUnderClaudeRoot`, `main` |
| `hooks/LoadContext.hook.ts` | `checkActiveProgress`, `getProjectProgress`, `getRecentWorkSessions`, `isDynamicEnabled`, `loadRelationshipContext`, `loadSettings`, `main` |
| `hooks/SatisfactionCapture.hook.ts` | `buildSatisfactionPrompt`, `captureLowRatingLearning`, `getLastResponse`, `getRecentContext`, `main`, `parseExplicitRating`, `readStdinWithTimeout`, `writeRating` |
| `hooks/PreCompact.hook.ts` | `getActiveISA`, `getCurrentWork`, `getRecentStateFiles`, `main`, `readJSON`, `readText` |
| `hooks/ResponseTabReset.hook.ts` | `main` |
| `hooks/UpdateCounts.hook.ts` | `main` |
| `hooks/ElicitationHandler.hook.ts` | `main` |
| `hooks/SmartApprover.hook.ts` | `bashTargetsTrustedPath`, `classifyReadWrite`, `isTrustedPath`, `loadCache`, `main`, `saveCache` |
| `hooks/PromptProcessing.hook.ts` | `acquireLock`, `appendPromptProcessingTelemetry`, `buildContextPrompt`, `disambiguateLabel`, `emitAdditionalContext`, `extractFallbackName`, `extractQuestionSubject`, `findSessionJsonl`, `getCustomTitle`, `getRecentContext`, `isExplicitRating`, `isNativeMode`, `isValidSessionName`, `main`, `quickTitle`, `readSessionNames`, `readStdinWithTimeout`, `releaseLock`, `sanitizePromptForNaming`, `sessionNameToTabTitle`, `storeName`, `stripPastedLetter`, `syncNameToJsonl`, `titleCase`, `toGerund`, `words`, `writeSessionNames` |
| `hooks/SessionCleanup.hook.ts` | `clearSessionWork`, `findStateFile`, `main` |
| `hooks/SetQuestionTab.hook.ts` | `extractSummary`, `main`, `readStdin` |
| `hooks/lib/change-detection.ts` | `capitalize`, `categorizeChange`, `createFileChange`, `determineSignificance`, `generateDescriptiveTitle`, `getCooldownEndTime`, `hashChanges`, `inferChangeType`, `isDuplicateRun`, `isInCooldown`, `isPhilosophicalPath`, `isSignificantChange`, `isStructuralPath`, `normalizeToRelativePath`, `parseToolUseBlocks`, `readIntegrityState`, `shouldDocumentChanges` |
| `hooks/lib/identity.ts` | `clearCache`, `getAlgorithmVoice`, `getDAName`, `getDefaultIdentity`, `getDefaultPrincipal`, `getIdentity`, `getObservabilityConfig`, `getPrincipal`, `getPrincipalName`, `getSettings`, `getStartupCatchphrase`, `getVoiceId`, `getVoicePersonality`, `getVoiceProsody`, `loadSettings` |
| `hooks/lib/notifications.ts` | `getSessionDurationMinutes`, `loadNtfyConfig`, `recordSessionStart`, `sendPush` |
| `hooks/lib/hook-io.ts` | `parseTranscriptFromInput`, `readHookInput` |
| `hooks/lib/output-validators.ts` | `gerundToPastTense`, `getCompletionFallback`, `getQuestionFallback`, `getVoiceFallback`, `getWorkingFallback`, `isValidCompletionTitle`, `isValidQuestionTitle`, `isValidTitleBase`, `isValidVoiceCompletion`, `isValidWorkingTitle`, `trimToValidTitle` |
| `hooks/lib/observability-transport.ts` | `cleanStaleSessions`, `collectEvents`, `getCFAccountId`, `getCFNamespaceId`, `getCFToken`, `pushEventsToTargets`, `pushStateToTargets`, `pushToCFKV`, `pushToHTTPTarget`, `readEnvOrPaiEnv` |
| `hooks/lib/learning-utils.ts` | `getLearningCategory`, `isLearningCapture` |
| `hooks/lib/learning-readback.ts` | `getRecentLearnings`, `loadFailurePatterns`, `loadLearningDigest`, `loadSignalTrends`, `loadSynthesisPatterns`, `loadWisdomFrames` |
| `hooks/lib/containment-zones.ts` | `componentMatch`, `isContained`, `isPatternAllowlisted`, `matchesPattern`, `relativeToClaudeRoot` |
| `hooks/lib/isa-template.ts` | `curateTitle`, `generateISAFilename`, `generateISAId`, `generateISATemplate`, `generatePRDFilename`, `generatePRDId`, `generatePRDTemplate` |
| `hooks/lib/log-rotation.ts` | `getYearMonth`, `rotateDirectory`, `rotateFile`, `rotateLogsIfNeeded` |
| `hooks/lib/tab-setter.ts` | `cleanupKittySession`, `cleanupStaleStateFiles`, `getKittyEnv`, `getSessionOneWord`, `isCmux`, `kittenBin`, `persistKittySession`, `phaseToCmuxLogLevel`, `readTabState`, `setCmuxState`, `setPhaseTab`, `setTabState`, `stateToCmuxLogLevel`, `stripPrefix` |
| `hooks/lib/isa-utils.ts` | `ARTIFACT_FILENAME`, `CANONICAL_CRITERIA_HEADING`, `CRITERIA_HEADING_RE`, `LEGACY_ARTIFACT_FILENAME`, `WORK_DIR`, `WORK_JSON`, `addRatingPulse`, `appendPhase`, `bumpLastToolActivity`, `countCriteria`, `diagnoseCriteria`, `extractCriteriaSection`, `extractIntentSnippet`, `findArtifactPath`, `findLatestISA`, `findLatestPRD`, `getSessionAgents`, `parseCapabilities`, `parseCriteriaList`, `parseFrontmatter`, `readRegistry`, `syncToWorkJson`, `updateSessionNameInWorkJson`, `upsertNativeSession`, `upsertSession`, `writeFrontmatterField`, `writeRegistry` |
| `hooks/lib/tab-constants.ts` | `ACTIVE_TAB_BG`, `ACTIVE_TAB_FG`, `INACTIVE_TAB_FG`, `TAB_COLORS` |
| `hooks/lib/paths.ts` | `expandPath`, `getClaudeDir`, `getEnvPath`, `getHooksDir`, `getMemoryDir`, `getPaiDir`, `getSettingsPath`, `getSkillsDir`, `paiPath` |
| `hooks/lib/time.ts` | `getFilenameTimestamp`, `getISOTimestamp`, `getPSTComponents`, `getPSTDate`, `getPSTTimestamp`, `getTimezone`, `getTimezoneDisplay`, `getYearMonth` |
| `hooks/RepeatDetection.hook.ts` | `jaccardSimilarity`, `main`, `saveCurrentPrompt`, `tokenize`, `trigrams` |
| `hooks/WorkCompletionLearning.hook.ts` | `findStateFile`, `getMonthDir`, `main`, `parseYaml`, `writeLearning` |
| `hooks/IntegrityCheck.hook.ts` | `main`, `readStdin` |
| `hooks/AgentInvocation.hook.ts` | `correlationKey`, `main`, `readStarts`, `readStdin`, `writeStarts` |
| `hooks/LastResponseCache.hook.ts` | `main` |
| `hooks/handlers/VoiceNotification.ts` | `getActiveWorkDir`, `handleVoice`, `logVoiceEvent`, `sendNotification` |
| `hooks/handlers/RebuildArchSummary.ts` | `handleRebuildArchSummary`, `rebuild` |
| `hooks/handlers/SystemIntegrity.ts` | `handleSystemIntegrity`, `spawnIntegrityMaintenance`, `updateIntegrityState` |
| `hooks/handlers/DocCrossRefIntegrity.ts` | `applyInferenceEdits`, `buildInferenceContext`, `checkHandlerFileRefs`, `checkHookCounts`, `checkHookFileRefs`, `checkLibFileRefs`, `checkSystemDocRefs`, `getHandlerFilesOnDisk`, `getHookFilesOnDisk`, `getLibFilesOnDisk`, `getModifiedFiles`, `getSystemDocsOnDisk`, `handleDocCrossRefIntegrity`, `isHookModified`, `isSystemDocModified`, `isSystemFileModified`, `listFiles`, `notifyVoice`, `runInferenceAnalysis`, `updateHookCount`, `updateLastUpdatedTimestamp` |
| `hooks/handlers/UpdateCounts.ts` | `countFilesRecursive`, `countHooks`, `countRatingsLines`, `countSkills`, `countSubdirs`, `countWorkflowFiles`, `getCounts`, `handleUpdateCounts`, `refreshUsageCache` |
| `hooks/handlers/TabState.ts` | `extractFromResponseContent`, `extractTabTitle`, `handleTabState`, `toGerund` |
| `hooks/ToolFailureTracker.hook.ts` | `main`, `readStdin` |
| `skills/Telos/ReportTemplate/Lib/utils.ts` | `cn` |
| `skills/Telos/Tools/UpdateTelos.ts` | `getPacificDateForLog`, `getPacificTimestamp`, `main` |
| `skills/Telos/DashboardTemplate/App/api/chat/route.ts` | `POST` |
| `skills/Telos/DashboardTemplate/App/api/file/get/route.ts` | `GET`, `dynamic` |
| `skills/Telos/DashboardTemplate/App/api/file/save/route.ts` | `POST` |
| `skills/Telos/DashboardTemplate/App/api/files/count/route.ts` | `GET`, `dynamic` |
| `skills/Telos/DashboardTemplate/App/api/upload/route.ts` | `POST` |
| `skills/Telos/DashboardTemplate/Lib/data.ts` | `budgetSummary`, `metrics`, `progressMetrics`, `projects`, `teams`, `vulnerabilities`, `vulnerabilitySummary` |
| `skills/Telos/DashboardTemplate/Lib/utils.ts` | `cn` |
| `skills/Telos/DashboardTemplate/Lib/telos-data.ts` | `getAllTelosData`, `getTelosContext`, `getTelosFileCount`, `getTelosFileList` |
| `skills/Evals/Tools/TrialRunner.ts` | `TrialRunner`, `calculatePassAtKForK`, `formatEvalResults` |
| `skills/Evals/Tools/PAIAgentAdapter.ts` | `PAIAgentAdapter` |
| `skills/Evals/Tools/ScenarioRunner.ts` | `computePassRates`, `loadScenarioModule`, `main`, `parseArgs`, `printHelp`, `requireAnthropicKey` |
| `skills/Evals/Tools/ScenarioToTranscript.ts` | `buildTrial`, `extractText`, `normalizeRole`, `scenarioResultToGraderResult`, `scenarioResultToTranscript` |
| `skills/Evals/Tools/TranscriptCapture.ts` | `TranscriptCapture`, `createTranscript`, `parseClaudeCodeTranscript` |
| `skills/Evals/Tools/FailureToTask.ts` | `convertAllFailures`, `convertFailureToTask`, `ensureDirs`, `formatFailure`, `inferDomain`, `inferGraders`, `loadFailures`, `loadUnconvertedFailures`, `logFailure`, `markConverted`, `saveTask` |
| `skills/Evals/Tools/SuiteManager.ts` | `addTaskToSuite`, `checkSaturation`, `createSuite`, `ensureDirs`, `formatSuiteSummary`, `graduateSuite`, `listSuites`, `loadSuite` |
| `skills/Evals/Tools/AlgorithmBridge.ts` | `findTaskFile`, `formatForISC`, `runEvalForAlgorithm`, `saveRunResults`, `updateISCWithResult` |
| `skills/Evals/Graders/ModelBased/PairwiseComparison.ts` | `PairwiseComparisonGrader` |
| `skills/Evals/Graders/ModelBased/LLMRubric.ts` | `LLMRubricGrader` |
| `skills/Evals/Graders/ModelBased/NaturalLanguageAssert.ts` | `NaturalLanguageAssertGrader` |
| `skills/Evals/Graders/Base.ts` | `BaseGrader`, `createGrader`, `listGraders`, `registerGrader`, `runGraders` |
| `skills/Evals/Graders/CodeBased/RegexMatch.ts` | `RegexMatchGrader` |
| `skills/Evals/Graders/CodeBased/ToolCallVerification.ts` | `ToolCallVerificationGrader` |
| `skills/Evals/Graders/CodeBased/StaticAnalysis.ts` | `StaticAnalysisGrader` |
| `skills/Evals/Graders/CodeBased/BinaryTests.ts` | `BinaryTestsGrader` |
| `skills/Evals/Graders/CodeBased/StringMatch.ts` | `StringMatchGrader` |
| `skills/Evals/Graders/CodeBased/StateCheck.ts` | `StateCheckGrader` |
| `skills/PAIUpgrade/Tools/Anthropic.ts` | `assessRelevance`, `countSkills`, `fetchBlog`, `fetchChangelog`, `fetchDocs`, `fetchGitHubRepo`, `generateNarrative`, `generateRecommendation`, `getLastRunInfo`, `hash`, `loadSources`, `loadState`, `logRun`, `main`, `saveState` |
| `skills/Prompting/Tools/RenderTemplate.ts` | `loadData`, `loadTemplate`, `main`, `registerPartials`, `renderTemplate`, `resolveTemplatePath` |
| `skills/Prompting/Tools/ValidateTemplate.ts` | `checkMissingVariables`, `checkUnbalancedBlocks`, `extractHelpers`, `extractPartials`, `extractVariables`, `hasPath`, `main`, `resolveTemplatePath`, `validateTemplate` |
| `skills/Prompting/Templates/Tools/RenderTemplate.ts` | `loadData`, `loadTemplate`, `main`, `registerPartials`, `renderTemplate`, `resolveTemplatePath` |
| `skills/Prompting/Templates/Tools/ValidateTemplate.ts` | `checkMissingVariables`, `checkUnbalancedBlocks`, `extractHelpers`, `extractPartials`, `extractVariables`, `hasPath`, `main`, `resolveTemplatePath`, `validateTemplate` |
| `skills/USMetrics/Tools/GenerateAnalysis.ts` | `calculateTrend`, `fetchEIAGasPrice`, `fetchFredSeries`, `formatValue`, `generateMarkdown`, `main` |
| `skills/USMetrics/Tools/FetchFredSeries.ts` | `calculateTrendStats`, `fetchFredSeries`, `main` |
| `skills/USMetrics/Tools/UpdateSubstrateMetrics.ts` | `fetchAllMetrics`, `fetchEIAGasPrice`, `fetchFredSeries`, `fetchTreasuryDebt`, `formatValue`, `generateCurrentCSV`, `generateHistoricalCSV`, `main`, `updateMarkdownFile` |
| `skills/Art/Tools/GenerateMidjourneyImage.ts` | `CLIError`, `handleError`, `loadEnv`, `main`, `parseArgs`, `showHelp` |
| `skills/Art/Tools/GeneratePrompt.ts` | `analyzeContent`, `buildMotifsDescription`, `buildVisualMetaphor`, `generatePrompt`, `main`, `parseArgs`, `readEssayContent`, `selectCharacter`, `selectColors`, `selectComposition`, `selectMotifs` |
| `skills/Art/Tools/FillFrame.ts` | `detectBgColor`, `getBbox`, `getDimensions`, `main`, `marginPercents`, `parseArgs` |
| `skills/Art/Tools/Generate.ts` | `CLIError`, `addBackgroundColor`, `detectImageFormat`, `detectMimeType`, `enhancePromptForTransparency`, `generateWithFlux`, `generateWithGPTImage`, `generateWithGPTImage2`, `generateWithNanoBanana`, `generateWithNanoBananaPro`, `handleError`, `loadEnv`, `main`, `parseArgs`, `removeBackground`, `saveImage`, `showHelp` |
| `skills/Art/Tools/ComposeThumbnail.ts` | `CLIError`, `composeThumbnail`, `cropToFaceOnly`, `main`, `parseArgs`, `printHelp`, `resolveColor`, `runCommand` |
| `skills/Art/Lib/discord-bot.ts` | `DiscordBotClient` |
| `skills/Art/Lib/midjourney-client.ts` | `MidjourneyClient`, `MidjourneyError` |
| `skills/AudioEditor/Tools/Analyze.ts` | `buildWindow`, `formatTime` |
| `skills/AudioEditor/Tools/Polish.ts` | `loadEnv` |
| `skills/AudioEditor/Tools/Pipeline.ts` | `formatTime` |
| `skills/Agents/Tools/ComposeAgent.ts` | `buildSavedAgentBody`, `composeAgent`, `deleteAgent`, `generateAgentColor`, `getProsody`, `inferTraitsFromTask`, `listSavedAgents`, `listTraits`, `loadAgent`, `loadTemplate`, `loadTraits`, `main`, `resolveVoice`, `saveAgent`, `slugify` |
| `skills/Agents/Tools/LoadAgentContext.ts` | `AgentContextLoader` |
| `skills/Daemon/Tools/DaemonAggregator.ts` | `aggregate`, `generalizeTheme`, `isExcluded`, `parseDaemonMd`, `readAbout`, `readBooks`, `readExistingDaemon`, `readFileIfExists`, `readGoals`, `readMissions`, `readMovies`, `readPreferences`, `readPublicProjects`, `readRecentIdeas`, `readWisdom`, `readWorkThemes`, `toDaemonMd` |
| `skills/Daemon/Tools/SecurityFilter.ts` | `filterContent`, `filterDaemonData`, `filterValue`, `loadContactNames`, `loadSecurityOverrides` |
| `skills/Webdesign/Tools/DriveClaudeDesign.ts` | `commandBundle`, `commandExport`, `commandOpen`, `commandPrompt`, `commandScreenshot`, `dumpMiss`, `getTree`, `labelOf`, `main`, `newestDownload`, `resolveInterceptorBin`, `run`, `walkTree` |
| `skills/Webdesign/Tools/VerifyDesign.ts` | `a11yFromTree`, `add`, `main`, `parseArgs`, `resolveInterceptorBin`, `resolveUrl`, `run`, `textOf`, `walkTree` |
| `skills/Webdesign/Tools/ProcessHandoffBundle.ts` | `emptyAssets`, `isUnder`, `main`, `parseBundle`, `parsePrompt`, `renderBrief`, `walk` |
| `skills/Apify/examples/instagram-scraper.ts` | `main` |
| `skills/Apify/examples/comparison-test.ts` | `demonstrateCodeFirstApproach`, `demonstrateFilteringComparison`, `demonstrateMCPApproach`, `estimateTokens`, `main` |
| `skills/Apify/examples/smoke-test.ts` | `main` |
| `skills/Apify/actors/social-media/linkedin.ts` | `scrapeLinkedInPosts`, `scrapeLinkedInProfile`, `searchLinkedInJobs` |
| `skills/Apify/actors/social-media/tiktok.ts` | `scrapeTikTokComments`, `scrapeTikTokHashtag`, `scrapeTikTokProfile`, `transformVideo` |
| `skills/Apify/actors/social-media/instagram.ts` | `scrapeInstagramComments`, `scrapeInstagramHashtag`, `scrapeInstagramPosts`, `scrapeInstagramProfile`, `transformPost` |
| `skills/Apify/actors/social-media/twitter.ts` | `mapToTwitterTweet`, `scrapeTwitterProfile`, `scrapeTwitterTweets`, `searchTwitter` |
| `skills/Apify/actors/social-media/facebook.ts` | `scrapeFacebookComments`, `scrapeFacebookGroups`, `scrapeFacebookPosts` |
| `skills/Apify/actors/social-media/youtube.ts` | `scrapeYouTubeChannel`, `scrapeYouTubeComments`, `searchYouTube`, `transformVideo` |
| `skills/Apify/actors/ecommerce/amazon.ts` | `scrapeAmazonProduct`, `scrapeAmazonReviews` |
| `skills/Apify/actors/web/web-scraper.ts` | `pageFunction`, `scrapePage`, `scrapeWebsite` |
| `skills/Apify/actors/business/google-maps.ts` | `scrapeGoogleMapsPlace`, `scrapeGoogleMapsReviews`, `searchGoogleMaps`, `transformPlace`, `transformReview` |
| `skills/Apify/skills/get-user-tweets.ts` | `main` |
| `skills/Apify/index.ts` | `Apify`, `ApifyDataset` |
| `skills/Remotion/Tools/Render.ts` | `createProject`, `getAudioDuration`, `getVideoMetadata`, `listCompositions`, `render`, `renderStill`, `startStudio`, `upgrade` |
| `skills/Remotion/Tools/Theme.ts` | `PAI_THEME`, `contentScreenStyle`, `fadeInterpolation`, `titleScreenStyle` |
| `PAI/TOOLS/DocCheck.ts` | `extractPathRefs`, `extractSectionRoots`, `findDocs`, `getChangedFiles`, `getSectionRootAt` |
| `PAI/TOOLS/BannerTokyo.ts` | `designA`, `designB`, `designC`, `designD`, `designE`, `designF` |
| `PAI/TOOLS/DAGrowth.ts` | `cmdDiary`, `cmdGrowth`, `cmdOpinions`, `cmdSummary`, `daysAgoStr`, `main`, `parsePrimaryDA` |
| `PAI/TOOLS/BannerRetro.ts` | `countHooks`, `countLearnings`, `countSkills`, `countUserFiles`, `countWorkItems`, `createBanner`, `createCompactRetroBanner`, `createPureASCIIBanner`, `createRetroBanner`, `generateProgressBar`, `getStats`, `getTerminalWidth`, `readDAIdentity` |
| `PAI/TOOLS/Banner.ts` | `center`, `createBanner`, `createElectricBanner`, `createIceBanner`, `createNavyBanner`, `createNavyCompactBanner`, `createNavyMediumBanner`, `createNavyMinimalBanner`, `createNavyUltraCompactBanner`, `createTealBanner`, `getNavyColors`, `getSmallLogo`, `getStats`, `getTerminalWidth`, `padEnd`, `padStart`, `randomHex`, `sparkline`, `visibleLength` |
| `PAI/TOOLS/ForgeProgress.ts` | `asRecord`, `buildSummary`, `collapse`, `endStream`, `ensureSlugDir`, `eventType`, `extractText`, `formatFinalLine`, `homeDir`, `itemRecord`, `main`, `nonEmpty`, `parseArgs`, `parseJsonLine`, `positiveInt`, `preflightCodex`, `readFinalMessage`, `readPrompt`, `sendChildSignal`, `sendNotify`, `spawnCodex`, `startProgressPoller`, `stringField`, `truncate`, `validUrl`, `waitForChild`, `wireSignals`, `wireStdout`, `wireTimeout`, `writeLine` |
| `PAI/TOOLS/CrossVendorAudit.ts` | `appendFinding`, `assembleBundle`, `estimateCost`, `extractJSON`, `extractTier`, `invokeCodex`, `main`, `parseArgs`, `readArtifacts`, `readISA`, `readToolActivityTail`, `rough` |
| `PAI/TOOLS/BillingPathAssertion.ts` | `BillingPathMismatchError`, `assertBillingPath`, `of`, `parseStreamJson`, `printUsage`, `readStdinSync` |
| `PAI/TOOLS/BannerPrototypes.ts` | `design1_glitch`, `design2_holo`, `design3_matrix`, `design4_scanlines`, `design5_blade`, `design6_ghost` |
| `PAI/TOOLS/DASchedule.ts` | `addTask`, `appendTask`, `cancelTask`, `ensureDir`, `listTasks`, `parseArgs`, `readTasks`, `writeTasks` |
| `PAI/TOOLS/IntegrityMaintenance.ts` | `buildContextSummary`, `capitalize`, `checkReferences`, `createUpdateEntry`, `determineSignificance`, `extractCommonPatterns`, `extractTextContent`, `generateDescriptiveTitle`, `generateExpectedImprovement`, `generateNarrativeWithAI`, `generatePurpose`, `generateVerboseNarrative`, `inferChangeType`, `main`, `readTranscriptContext`, `sendVoiceNotification`, `sleep` |
| `PAI/TOOLS/ReferenceCheck.ts` | `extractRefs`, `extractSectionRoots`, `fenceMap`, `getChangedFiles`, `getLatestAlgorithmVersion`, `getSectionRootAt`, `isArchivedAlgorithmVersion`, `isExcludedDir`, `isScannableFile`, `walk` |
| `PAI/TOOLS/RelationshipReflect.ts` | `addMilestone`, `aggregateEvidence`, `checkMilestones`, `escapeRegex`, `getISODate`, `getPSTComponents`, `loadRecentNotes`, `loadRecentRatings`, `main`, `parseOpinions`, `parseRelationshipNotes`, `reflect`, `sendNotification`, `updateOpinionConfidence` |
| `PAI/TOOLS/Inference.ts` | `advisor`, `inference`, `main`, `synthesizeAdvisorState` |
| `PAI/TOOLS/BannerNeofetch.ts` | `center`, `colorLogo`, `colorPaiArt`, `countHooks`, `countLearnings`, `countSkills`, `countUserFiles`, `countWorkItems`, `createCompactBanner`, `createNeofetchBanner`, `getStats`, `getTerminalWidth`, `main`, `padEnd`, `progressBar`, `readDAIdentity`, `sparklineHistogram`, `visibleLength` |
| `PAI/TOOLS/ExtractTranscript.ts` | `calculateCost`, `getFileSizeMB`, `getFilesFromDirectory`, `isSupportedFile`, `main`, `parseArgs`, `saveTranscript`, `transcribeFile` |
| `PAI/TOOLS/TlpArchive.ts` | `buildArchiveIndex`, `buildEntry`, `buildUrlList`, `decodeEntities`, `extractDivByMarker`, `fetchHtml`, `htmlToMd`, `main`, `or`, `parsePost`, `parsePostDate`, `processOne`, `runBulk`, `worker`, `yamlQuote` |
| `PAI/TOOLS/WisdomDomainClassifier.ts` | `classifyDomains`, `listFrames`, `loadRelevantFrames` |
| `PAI/TOOLS/MemoryRetriever.ts` | `compress`, `computeBM25`, `discoverNotes`, `extractExcerpt`, `formatResults`, `main`, `parseFrontmatter`, `printHelp`, `scoreNote`, `tokenize` |
| `PAI/TOOLS/AnvilProgress.ts` | `asRecord`, `cancelWithTimeout`, `choiceDeltaContent`, `collapse`, `consumeSseEvent`, `drainSseBuffer`, `emptyErrorLine`, `endStream`, `ensureSlugDir`, `errorCode`, `errorMessage`, `formatFinalLine`, `homeDir`, `isAbortError`, `main`, `nextBoundary`, `nonEmpty`, `nonNegativeNumber`, `parseArgs`, `parseMoonshotApiKey`, `parseSsePayload`, `positiveInt`, `postMoonshot`, `readMoonshotApiKey`, `readPrompt`, `readResponseBodyText`, `readWithTimeout`, `runMoonshot`, `sendNotify`, `startProgressPoller`, `streamSse`, `tailCollapsed`, `truncate`, `unquote`, `validUrl`, `wireSignals`, `wireTimeout`, `writeFinal`, `writeLine` |
| `PAI/TOOLS/PAILogo.ts` | `getLogo`, `printLogo` |
| `PAI/TOOLS/PipelineOrchestrator.ts` | `interpolate`, `loadPipeline`, `main`, `reportStart`, `reportStep`, `reportUpdate`, `resolvePath`, `runAction`, `runDemo`, `runPipeline` |
| `PAI/TOOLS/GetCounts.ts` | `countFilesRecursive`, `countHooks`, `countRatings`, `countSkills`, `countWorkflowFiles`, `getCounts` |
| `PAI/TOOLS/HarvestExecutor.ts` | `countStatuses`, `detectBackfill`, `dispatchAction`, `escapeDoubleQuotes`, `executeItem`, `fetchHarvestItems`, `formatItemSummary`, `handleCreateKnowledgeIdea`, `handleCreateLearningQueue`, `handleOpenGithubIssue`, `handleTelosUpdate`, `isHarvestItem`, `isSidecarItemRecord`, `kebabCase`, `loadAuthToken`, `loadKnowledgeIndex`, `loadNoteRelated`, `loadSidecar`, `main`, `parseActions`, `parseCli`, `parseFrontmatter`, `saveSidecar`, `slugExists`, `tokenOverlapScore`, `tokenizeForOverlap` |
| `PAI/TOOLS/FeatureRegistry.ts` | `addFeature`, `calculateSummary`, `generateId`, `getRegistryPath`, `initRegistry`, `listFeatures`, `loadRegistry`, `nextFeature`, `saveRegistry`, `updateFeature`, `verifyFeatures` |
| `PAI/TOOLS/KnowledgeHarvester.ts` | `classifyDomain`, `cmdContradictions`, `cmdHarvest`, `cmdIndex`, `cmdStatus`, `expireStaleSeedlings`, `extractSection`, `extractTags`, `getArchiveStats`, `getSentimentForSession`, `isDuplicate`, `loadHarvestState`, `parseFrontmatter`, `regenerateMOC`, `regenerateMasterMOC`, `saveHarvestState`, `scanAutoMemory`, `scanHarvestQueue`, `scanReflections`, `scanResearch`, `scanWorkISAs`, `temporalWindowsOverlap`, `toKebabCase`, `walk`, `writeNote` |
| `PAI/TOOLS/HealthSnapshot.ts` | `fmt`, `ingestOne`, `main`, `toMarkdown`, `todayLA` |
| `PAI/TOOLS/Recommend.ts` | `daysSince`, `loadCandidates`, `parseEntries`, `parseRecencyDays`, `rank`, `readIf` |
| `PAI/TOOLS/gmail.ts` | `accessToken`, `archiveBatch`, `b64url`, `buildRfc822`, `countQuery`, `fetchMin`, `gmail`, `listIds`, `parseSendArgs`, `readStdin`, `resolveThreadFromReplyId`, `sendMessage` |
| `PAI/TOOLS/LearningPatternSynthesis.ts` | `analyzeRatings`, `detectPatterns`, `formatSynthesisReport`, `groupToPatternGroups`, `writeSynthesis` |
| `PAI/TOOLS/pipeline-monitor-ui/src/lib/utils.ts` | `cn` |
| `PAI/TOOLS/SplitAndTranscribe.ts` | `splitAndTranscribe`, `splitAudioFile`, `transcribeChunk` |
| `PAI/TOOLS/OpinionTracker.ts` | `addEvidence`, `addOpinion`, `ensureRelationshipDir`, `generateNotification`, `getISODate`, `listOpinions`, `logRelationshipEvent`, `main`, `parseOpinions`, `showOpinion` |
| `PAI/TOOLS/InterviewScan.ts` | `formatHuman`, `formatJson`, `formatNext`, `main`, `scoreFile` |
| `PAI/TOOLS/YouTubeApi.ts` | `formatNum`, `getChannel`, `getRecentVideos`, `getVideoStats`, `loadEnv`, `searchVideos`, `showHelp` |
| `PAI/TOOLS/ArchitectureSummaryGenerator.ts` | `cmdCheck`, `cmdGenerate`, `compareSemver`, `detectAlgorithmVersion`, `detectMemoryVersion`, `detectPaiVersion`, `extractPrinciples`, `extractSections`, `extractSubsystems`, `extractTopology`, `generate`, `getMtime` |
| `PAI/TOOLS/MigrateApprove.ts` | `cmdApprove`, `cmdApproveAll`, `cmdApproveTarget`, `cmdModify`, `cmdReject`, `cmdReset`, `cmdReview`, `cmdSummary`, `commitProposal`, `loadQueue`, `logCommit`, `resolveTargetPath`, `saveQueue` |
| `PAI/TOOLS/KnowledgeGraph.ts` | `allEdgesForNode`, `buildGraph`, `cmdFind`, `cmdHubs`, `cmdRelated`, `cmdStats`, `cmdTraverse`, `connectionCount`, `edgeDescription`, `ensureAdj`, `extractRelated`, `extractWikilinks`, `parseFrontmatter`, `resolveSlug`, `showHelp`, `traverse` |
| `PAI/TOOLS/TranscriptParser.ts` | `collectCurrentResponseText`, `contentToText`, `detectResponseState`, `extractCompletionPlain`, `extractStructuredSections`, `extractVoiceCompletion`, `getLastAssistantMessage`, `parseLastAssistantMessage`, `parseTranscript` |
| `PAI/TOOLS/ApproveCurrentStateEntries.ts` | `appendToTarget`, `approve`, `approveAll`, `formatPayload`, `loadQueue`, `reject`, `reviewQueue`, `saveQueue` |
| `PAI/TOOLS/DAInterview.ts` | `ask`, `askChoice`, `askNumber`, `askRequired`, `escYaml`, `generateIdentityMd`, `generateIdentityYaml`, `loadExistingIdentity`, `main`, `parseArgs`, `parsePresets`, `print`, `printBanner`, `println`, `readRegistry`, `runPhase1`, `runPhase1WithDefaults`, `runPhase2`, `runPhase3`, `writeRegistry` |
| `PAI/TOOLS/WisdomCrossFrameSynthesizer.ts` | `assessHealth`, `computeSimilarity`, `findCrossPrinciples`, `generateHealthReport`, `generatePrinciplesReport`, `parseFrame` |
| `PAI/TOOLS/AgentWatchdog.ts` | `check`, `getActiveAgents`, `getLastActivityEpoch` |
| `PAI/TOOLS/Arthur.ts` | `ArthurDeniedError`, `audit`, `checkRate`, `checkTimeWindow`, `evaluate`, `fetchFromGCP`, `get`, `getPolicy`, `loadPolicies`, `requestConfirmation`, `securityLogPath` |
| `PAI/TOOLS/MigrateScan.ts` | `chunkContent`, `classify`, `main`, `readSource`, `walk` |
| `PAI/TOOLS/AddBg.ts` | `addBackground`, `main`, `showHelp`, `validateHexColor` |
| `PAI/TOOLS/SessionProgress.ts` | `addBlocker`, `addDecision`, `addWork`, `completeProgress`, `createProgress`, `getProgressPath`, `listActive`, `loadProgress`, `resumeProgress`, `saveProgress`, `setHandoff`, `setNextSteps` |
| `PAI/TOOLS/SecretScan.ts` | `displayFinding`, `formatFindings`, `main`, `parseTruffleHogOutput`, `runTruffleHog` |
| `PAI/TOOLS/AlgorithmPhaseReport.ts` | `getArg`, `readState`, `writeState` |
| `PAI/TOOLS/DAIdentityGenerator.ts` | `generateMarkdown`, `traitBar` |
| `PAI/TOOLS/PipelineMonitor.ts` | `broadcast`, `connect`, `getColumnForExec`, `getCurrentStepIndex`, `handleEvent`, `render` |
| `PAI/TOOLS/RemoveBg.ts` | `main`, `removeBackground`, `resolveRembgBin`, `runRembg`, `showHelp` |
| `PAI/TOOLS/LoadSkillConfig.ts` | `getCustomizationPath`, `hasCustomizations`, `listCustomizedSkills`, `loadExtendManifest`, `loadSkillConfig` |
| `PAI/TOOLS/pai.ts` | `cmdHelp`, `cmdLaunch`, `cmdMcpList`, `cmdProfiles`, `cmdPrompt`, `cmdUpdate`, `cmdVersion`, `cmdWallpaper`, `compareVersions`, `displayBanner`, `error`, `findWallpaper`, `getCurrentProfile`, `getCurrentVersion`, `getIndividualMcps`, `getLatestVersion`, `getMcpProfiles`, `getWallpaperName`, `getWallpapers`, `log`, `main`, `mergeMcpConfigs`, `notifyVoice`, `setMcpCustom`, `setMcpProfile`, `setWallpaper` |
| `PAI/TOOLS/FailureCapture.ts` | `captureFailure`, `contentToText`, `generateDescription`, `getPSTComponents`, `migrateExistingFailures`, `parseTranscript` |
| `PAI/TOOLS/GenerateTelosSummary.ts` | `generate`, `parseChallenges`, `parseGoals`, `parseItems`, `parseMissions`, `parseModels`, `parseNarratives`, `parseProblems`, `parseStrategies`, `parseTraumas`, `parseWrong`, `readTelosFile`, `truncate` |
| `PAI/TOOLS/WisdomFrameUpdater.ts` | `addAntiPattern`, `addContextualRule`, `addPrediction`, `appendEvolution`, `getDateStr`, `getFramePath`, `incrementObservationCount`, `parseObservationCount`, `updateCrystallizedDate`, `updateFrame` |
| `PAI/TOOLS/SessionHarvester.ts` | `confidenceIcon`, `contentOverlap`, `extractTextContent`, `formatLearningFile`, `generateLearningFilename`, `getMonthDir`, `getSessionFiles`, `harvestLearnings`, `matchesPatterns`, `mineMemories`, `writeLearning`, `writeToQueue` |
| `PAI/TOOLS/Checkpoint.ts` | `cmdList`, `cmdRollback`, `cmdShow`, `expandPath`, `findCommit`, `gitRun`, `loadAllowlist`, `loadIscDescriptions`, `loadState`, `slugPaths`, `truncate`, `usage` |
| `PAI/TOOLS/CostTracker.ts` | `classifyCallSite`, `fetchApiSpend`, `fileHasGuard`, `formatStatus`, `main`, `readBaseline`, `readSubscriptionUsage`, `scanCallSites`, `takeSnapshot`, `voiceAlert`, `writeBaseline` |
| `PAI/TOOLS/NeofetchBanner.ts` | `center`, `colorLogo`, `countHooks`, `countLearnings`, `countSkills`, `countUserFiles`, `countWorkItems`, `createCompactBanner`, `createNeofetchBanner`, `generateBinary`, `generatePaiArt`, `generateSentimentHistogram`, `getDisplayMode`, `getStats`, `getTerminalWidth`, `main`, `padLeft`, `padRight`, `randomHex`, `readDAIdentity`, `stripAnsi`, `visibleLength` |
| `PAI/TOOLS/BannerMatrix.ts` | `countHooks`, `countLearnings`, `countSkills`, `countUserFiles`, `countWorkItems`, `createBanner`, `createMicroBanner`, `createMiniBanner`, `createNanoBanner`, `createNormalBanner`, `generateRainColumn`, `getDisplayMode`, `getStats`, `getTerminalWidth`, `glitchText`, `rainOverlay`, `randomBinary`, `randomHex`, `randomKatakana`, `randomMatrixChar`, `readDAIdentity` |
| `PAI/TOOLS/algorithm.ts` | `appendISAChangelog`, `buildIdeatePrompt`, `buildInteractivePrompt`, `buildIterationPrompt`, `buildProgressBar`, `buildWorkerPrompt`, `countCriteria`, `createLoopState`, `createNewISA`, `detectPlateau`, `ensureAlgorithmsDir`, `extractISATitle`, `finalizeLoopState`, `findAllISAs`, `getDomain`, `parseArgs`, `partitionCriteria`, `pauseLoop`, `printHelp`, `printISAStatus`, `readAlgorithmState`, `readISA`, `readSessionNames`, `removeSessionName`, `resolveISAPath`, `resolveParameters`, `resumeLoop`, `runIdeate`, `runInteractive`, `runLoop`, `runParallelIteration`, `showStatus`, `stopLoop`, `syncCriteriaToState`, `updateFrontmatter`, `updateLoopStateForIteration`, `voiceNotify`, `writeAlgorithmState`, `writeSessionName` |
| `PAI/TOOLS/InterviewIdealState.ts` | `countTbd`, `loadState`, `markDone`, `saveState`, `showDimension`, `showNext`, `showStatus` |
| `PAI/TOOLS/ActivityParser.ts` | `categorizeFile`, `determineChangeType`, `determineSignificance`, `emptyActivity`, `extractSkillName`, `formatChangeType`, `generateExpectedImprovement`, `generatePurpose`, `generateTitle`, `generateUpdateFile`, `getRelativePath`, `getSignificanceBadge`, `getTodaySessionFiles`, `parseEvents`, `shouldSkip`, `toKebabCase`, `writeUpdateFile` |
| `PAI/TOOLS/ComputeGap.ts` | `computeDimension`, `computeFreedom`, `computeHealth`, `computeMoney`, `formatHuman`, `logEntry`, `main`, `readIf` |
| `PAI/TOOLS/ProposeCurrentStateEntry.ts` | `enqueue`, `parseArgs` |
| `PAI/bin/llcli/llcli.ts` | `fetchDate`, `fetchLifelogs`, `fetchSearch`, `fetchToday`, `loadConfig`, `main`, `showHelp`, `showVersion` |
| `PAI/PULSE/pulse-old.ts` | `handleAgentGuard`, `handleSkillGuard`, `main`, `msUntilNextDue` |
| `PAI/PULSE/pulse-unified.ts` | `buildHealthResponse`, `loadModules`, `loadPulseConfig`, `main`, `msUntilNextDue`, `supervise` |
| `PAI/PULSE/checks/life-morning-brief.ts` | `getNextMove`, `getRandomSpark`, `getTopGoals`, `readFile` |
| `PAI/PULSE/checks/github.ts` | `checkRepo`, `loadSeen`, `main`, `saveSeen` |
| `PAI/PULSE/checks/github-work.ts` | `claimIssue`, `completeIssue`, `executeWork`, `findReadyIssues`, `getInstallationToken`, `loadWorkerConfig`, `main` |
| `PAI/PULSE/checks/poller-meta-monitor.ts` | `loadPulseSchedules`, `loadPulseState`, `main`, `parseCronToMs` |
| `PAI/PULSE/checks/calendar.ts` | `getAccessToken`, `loadEnv`, `main` |
| `PAI/PULSE/checks/notification-governor.ts` | `cmdClearSource`, `cmdNotify`, `cmdReportFalseAlert`, `cmdStatus`, `daysSince`, `dispatch`, `fingerprint`, `hoursSince`, `inQuietHours`, `loadState`, `logDecision`, `main`, `pruneOld`, `saveState`, `shouldDispatch` |
| `PAI/PULSE/checks/airgradient-poll.ts` | `fetchMonitors`, `loadTokenFromDotenv`, `main` |
| `PAI/PULSE/checks/health.ts` | `checkSite`, `main` |
| `PAI/PULSE/checks/example-check.ts` | `run` |
| `PAI/PULSE/setup.ts` | `generateConfigs`, `heading`, `healthCheck`, `installService`, `main`, `ok`, `prompt`, `readIdentity`, `setupGitHubApp`, `setupLocalHTTPS`, `setupTelegram`, `warn` |
| `PAI/PULSE/Observability/observability.ts` | `asLifeGoals`, `asLifeSections`, `buildSpendInsights`, `cadenceToMonthly`, `capitalizeFirst`, `clampFuture`, `cleanInlineMarkdown`, `clusters`, `computeFreshness`, `cutReason`, `errorMessage`, `existsSafe`, `firstParagraph`, `getDashboardDir`, `handleAgentsApi`, `handleAlgorithmApi`, `handleEventsRecentApi`, `handleGetKnowledgeNote`, `handleKnowledgeApi`, `handleLadderApi`, `handleLifeAir`, `handleLifeBusiness`, `handleLifeCardApi`, `handleLifeFinances`, `handleLifeGoals`, `handleLifeHealth`, `handleLifeHome`, `handleLifeWork`, `handleNoveltyApi`, `handleObservabilityRequest`, `handleOnboardingState`, `handlePutKnowledgeNote`, `handleSecurityApi`, `handleSecurityHooksDetail`, `handleSecurityPatternsMutation`, `handleSecurityRulesMutation`, `handleTelosFileGet`, `handleTelosFilePut`, `handleTelosOverview`, `handleToolFailuresApi`, `handleUserIndexApi`, `handleVoiceEventsApi`, `isRecord`, `observabilityHealth`, `parseBoldFields`, `parseBullets`, `parseContentDate`, `parseCurrencyCell`, `parseCurrencyTable`, `parseEffectiveTaxRate`, `parseFilenameDate`, `parseFrontmatter`, `parseGoals`, `parseHeadingText`, `parseKnowledgeNotePath`, `parseNestedHeadings`, `parseNumberedList`, `parseSections`, `parseSourceHeadings`, `readDirMdFiles`, `readJsonlTail`, `readMd`, `readStatementSpendJsonl`, `readVendorCostsJsonl`, `serveStaticFile`, `startObservability`, `toInsightLine`, `validateTelosFileName` |
| `PAI/PULSE/Observability/src/app/telos/_v7/data.ts` | `TELOS`, `primitives` |
| `PAI/PULSE/Observability/src/app/telos/_v7/use-telos-data.ts` | `useTelosData` |
| `PAI/PULSE/Observability/src/components/activity/ChartRenderer.ts` | `ChartRenderer`, `createChartRenderer` |
| `PAI/PULSE/Observability/src/hooks/useNoveltyDashboard.ts` | `useNoveltyDashboard` |
| `PAI/PULSE/Observability/src/hooks/useAdvancedMetrics.ts` | `useAdvancedMetrics` |
| `PAI/PULSE/Observability/src/hooks/useChartData.ts` | `useChartData` |
| `PAI/PULSE/Observability/src/hooks/useHeatLevel.ts` | `getHeatIndex`, `hexToRgb`, `interpolateColor`, `rgbToHex`, `useHeatLevel` |
| `PAI/PULSE/Observability/src/hooks/useNoveltyState.ts` | `useNoveltyState` |
| `PAI/PULSE/Observability/src/hooks/usePAIEvents.ts` | `usePAIEvents` |
| `PAI/PULSE/Observability/src/hooks/useAlgorithmState.ts` | `inferMode`, `normalizeState`, `useAlgorithmState` |
| `PAI/PULSE/Observability/src/hooks/useAgentEvents.ts` | `useAgentEvents` |
| `PAI/PULSE/Observability/src/lib/utils.ts` | `cleanTitle`, `cn`, `formatNumber`, `getCategoryColor`, `getCountryFlag`, `getCountryName`, `getSourceIcon`, `timeAgo`, `truncate` |
| `PAI/PULSE/Observability/src/lib/wiki-links.ts` | `WIKI_GRAPH_URL`, `wikiPageUrl` |
| `PAI/PULSE/Observability/src/lib/local-api.ts` | `getLocalOnlyWsUrl`, `getResolvedWsUrl`, `localApiCall`, `localOnlyApiCall` |
| `PAI/PULSE/lib/sanitize.ts` | `analyzeForInjection`, `sanitize`, `wrapUntrusted` |
| `PAI/PULSE/lib/imessage-send.ts` | `escapeForAppleScript`, `sendMessage`, `splitMessage` |
| `PAI/PULSE/lib/messages-db.ts` | `getLatestRowId`, `getNewMessages`, `verifyAccess` |
| `PAI/PULSE/lib/conversation.ts` | `ConversationStore` |
| `PAI/PULSE/lib.ts` | `dispatch`, `dispatchSingle`, `isDue`, `isSentinel`, `loadConfig`, `log`, `matchesCron`, `parseField`, `readState`, `resolveEnvVars`, `spawnClaude`, `spawnScript`, `writeState` |
| `PAI/PULSE/Performance/module.ts` | `handleAnthropicCostApi`, `handleCostApi`, `handleFailuresApi`, `handlePerformanceRequest`, `handleSummaryApi`, `performanceHealth`, `startPerformance` |
| `PAI/PULSE/Performance/cost-aggregator.ts` | `getPricing`, `loadExistingSessionIds`, `loadState`, `main`, `processSessionFile`, `saveState` |
| `PAI/PULSE/modules/wiki.ts` | `buildExcerpt`, `buildFullIndex`, `buildTree`, `countWords`, `extractTitle`, `extractWikilinks`, `getRecentChanges`, `getStats`, `getWorkerType`, `handleArbolDetail`, `handleArbolList`, `handleBacklinks`, `handleBookmark`, `handleDoc`, `handleGraph`, `handleHookDetail`, `handleHooksList`, `handleIndex`, `handleKnowledgeNote`, `handleSearch`, `handleSkillDetail`, `handleSkillUpdate`, `handleSkillsList`, `handleWikiRequest`, `indexBookmarks`, `indexFile`, `indexKnowledgeArchive`, `indexSystemDoc`, `indexSystemDocs`, `insertIntoTree`, `isMarkdownFile`, `jsonResponse`, `normalizeWikilink`, `notFound`, `parseCsv`, `parseCsvRow`, `parseFrontmatter`, `pathParts`, `readPageContent`, `rebuildBacklinks`, `rebuildSearchIndex`, `resolveAlgorithmDir`, `scheduleBookmarkReindex`, `scheduleReindex`, `sortedGroupNames`, `sortedPages`, `startWatchers`, `startWiki`, `stopWatchers`, `stopWiki`, `stringArrayFromFrontmatter`, `stripFrontmatter`, `stripMarkdownExtension`, `systemDocMetadata`, `treeLeaf`, `walkMarkdown`, `wikiHealth` |
| `PAI/PULSE/modules/syslog.ts` | `handleRequest`, `health`, `start`, `stop` |
| `PAI/PULSE/modules/imessage.ts` | `appendChatLog`, `imessageHealth`, `log`, `poll`, `processMessage`, `saveCursor`, `startIMessage`, `stopIMessage` |
| `PAI/PULSE/modules/telegram.ts` | `appendChatLog`, `log`, `startTelegram`, `stopTelegram`, `telegramHealth` |
| `PAI/PULSE/modules/example-module.ts` | `handleRequest`, `health`, `start`, `stop` |
| `PAI/PULSE/modules/hooks.ts` | `handleAgentGuard`, `handleHooksRequest`, `handleHooksRequestAsync`, `handleSkillGuard`, `hooksHealth`, `startHooks` |
| `PAI/PULSE/modules/user-index.ts` | `buildIndex`, `cli`, `computeCompleteness`, `computeStaleness`, `extractPreview`, `extractTitle`, `handleRequest`, `health`, `inferFallback`, `parseCadence`, `parseCollection`, `parseFile`, `parseFrontmatter`, `reindexDebounced`, `start`, `stop`, `walk`, `walkUserDir`, `writeIndex` |
| `PAI/PULSE/VoiceServer/voice.ts` | `applyPronunciations`, `checkRateLimit`, `errorStatus`, `escapeForAppleScript`, `escapeRegex`, `extractEmotionalMarker`, `generateSpeech`, `handleVoiceRequest`, `jsonResponse`, `loadPronunciations`, `loadVoiceConfigFromSettings`, `playAudio`, `sanitizeForSpeech`, `sendNotification`, `showDesktopNotification`, `startVoice`, `validateInput`, `voiceHealth` |
| `PAI/PULSE/pulse.ts` | `buildHealthResponse`, `loadModules`, `loadPulseConfig`, `main`, `msUntilNextDue`, `supervise` |
| `PAI/PAI-Install/main.ts` | `main` |
| `PAI/PAI-Install/web/routes.ts` | `addClient`, `broadcast`, `createWsEmitter`, `getState`, `handleWsMessage`, `removeClient`, `requestChoice`, `requestInput`, `startInstallation` |
| `PAI/PAI-Install/web/server.ts` | `resetInactivity` |
| `PAI/PAI-Install/cli/prompts.ts` | `isAutomated`, `promptChoice`, `promptChoiceWithPreview`, `promptConfirm`, `promptSecret`, `promptText` |
| `PAI/PAI-Install/cli/display.ts` | `c`, `padVisible`, `print`, `printBanner`, `printDetection`, `printError`, `printInfo`, `printQuestion`, `printSectionHeader`, `printStep`, `printSuccess`, `printSummary`, `printValidation`, `printWarning`, `progressBar`, `visibleLength` |
| `PAI/PAI-Install/cli/index.ts` | `createEventHandler`, `getChoice`, `getChoiceWithPreview`, `getInput`, `previewVoiceViaPulse`, `runCLI` |
| `PAI/PAI-Install/generate-welcome.ts` | `generateWelcome`, `getVoiceId` |
| `PAI/PAI-Install/engine/state.ts` | `clearState`, `completeStep`, `createFreshState`, `hasSavedState`, `loadState`, `maskKey`, `recordError`, `saveState`, `skipStep` |
| `PAI/PAI-Install/engine/detect.ts` | `countContacts`, `countGoals`, `countProjectRows`, `detectDaName`, `detectExisting`, `detectExistingUserContent`, `detectOS`, `detectPrincipal`, `detectShell`, `detectSystem`, `detectTool`, `detectVoice`, `fileExists`, `scanApiKeys`, `tryExec`, `validateElevenLabsKey` |
| `PAI/PAI-Install/engine/validate.ts` | `checkPulseHealth`, `checkSecurityHookSmoke`, `generateSummary`, `runValidation` |
| `PAI/PAI-Install/engine/config-gen.ts` | `generateSettingsJson` |
| `PAI/PAI-Install/engine/types.ts` | `ALGORITHM_VERSION`, `INSTALLER_VERSION`, `PAI_VERSION` |
| `PAI/PAI-Install/engine/actions.ts` | `collectTopLevelExtraMarkdown`, `computeBackupPath`, `copyBundleTree`, `copyMigrationEntry`, `copyMissing`, `copyOverwriteTemplates`, `deduplicateBunShellEntries`, `detectLocalBundle`, `emitSectionHeader`, `findExistingEnvKey`, `findExistingVoiceConfig`, `findKeyInBackupDirs`, `installFromLocalBundle`, `installPulse`, `installPulseMenuBar`, `inventoryExistingConfig`, `isPlaceholderValue`, `isPulseRunning`, `migrateUserContentFromBackup`, `migrateUserContext`, `moveExistingClaudeToBackup`, `pathLooksLikeExistingClaudeRoot`, `readKeyFromFile`, `reloadPulse`, `restartPulse`, `runApiKeys`, `runConfiguration`, `runIdentity`, `runPrerequisites`, `runRepository`, `runSystemDetect`, `runTelegramSetup`, `runVoiceSetup`, `shouldOverwriteTemplateDestination`, `skipStep`, `summariseExistingUserContent`, `tryExec`, `validateTelegramBotToken`, `writeEnvKey` |
| `PAI/PAI-Install/engine/steps.ts` | `getNextStep`, `getProgress`, `getStep`, `getStepStatuses` |
