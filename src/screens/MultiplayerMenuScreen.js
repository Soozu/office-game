import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function MultiplayerMenuScreen({ navigation }) {
    const [playerName, setPlayerName] = useState('');

    const handleHost = () => {
        if (!playerName.trim()) return;
        navigation.navigate('MultiplayerLobby', { mode: 'host', playerName: playerName.trim() });
    };

    const handleJoin = () => {
        if (!playerName.trim()) return;
        navigation.navigate('MultiplayerLobby', { mode: 'join', playerName: playerName.trim() });
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.heroCard}>
                        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                            <Text style={styles.backButtonText}>‹ Back</Text>
                        </TouchableOpacity>
                        <Text style={styles.heroEyebrow}>local network</Text>
                        <Text style={styles.heroTitle}>Multiplayer</Text>
                        <Text style={styles.heroSubtitle}>
                            Challenge a friend on the same WiFi network! One player hosts, the other joins. Both answer the same questions head-to-head.
                        </Text>
                    </View>

                    {/* Player name input */}
                    <View style={styles.nameCard}>
                        <Text style={styles.nameLabel}>Your Name</Text>
                        <TextInput
                            style={styles.nameInput}
                            value={playerName}
                            onChangeText={setPlayerName}
                            placeholder="Enter your name..."
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            maxLength={20}
                            autoCapitalize="words"
                        />
                    </View>

                    {/* Host / Join */}
                    <View style={styles.modeGrid}>
                        <TouchableOpacity
                            style={[styles.modeCard, styles.hostCard, !playerName.trim() && styles.disabledCard]}
                            onPress={handleHost}
                            activeOpacity={0.9}
                            disabled={!playerName.trim()}
                        >
                            <Text style={styles.modeIcon}>🏠</Text>
                            <Text style={styles.modeTitle}>Host a Game</Text>
                            <Text style={styles.modeDescription}>
                                Create a room, pick the quiz topic, and invite a friend to join using your IP address.
                            </Text>
                            <View style={[styles.modePill, styles.hostPill]}>
                                <Text style={[styles.modePillText, styles.hostPillText]}>Create room →</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modeCard, styles.joinCard, !playerName.trim() && styles.disabledCard]}
                            onPress={handleJoin}
                            activeOpacity={0.9}
                            disabled={!playerName.trim()}
                        >
                            <Text style={styles.modeIcon}>🔗</Text>
                            <Text style={styles.modeTitle}>Join a Game</Text>
                            <Text style={styles.modeDescription}>
                                Enter the host's IP address to connect and play against them in real time.
                            </Text>
                            <View style={[styles.modePill, styles.joinPill]}>
                                <Text style={[styles.modePillText, styles.joinPillText]}>Connect →</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.tipCard}>
                        <Text style={styles.tipTitle}>💡 How it works</Text>
                        <Text style={styles.tipText}>
                            • Both devices must be on the same WiFi{'\n'}
                            • The host picks the app and difficulty{'\n'}
                            • Both players get the same questions{'\n'}
                            • Highest score at the end wins!
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 40,
        gap: 20,
    },
    heroCard: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 28,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.25,
        shadowRadius: 24,
        gap: 12,
    },
    backButton: {
        alignSelf: 'flex-start',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    backButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    heroEyebrow: {
        textTransform: 'uppercase',
        letterSpacing: 3,
        fontSize: 12,
        fontWeight: '700',
        color: '#FBBF24',
    },
    heroTitle: {
        fontSize: 30,
        fontWeight: '800',
        color: '#fff',
    },
    heroSubtitle: {
        color: '#E2E8F0',
        fontSize: 15,
        lineHeight: 22,
    },
    nameCard: {
        backgroundColor: 'rgba(15,23,42,0.55)',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(148,163,184,0.25)',
        gap: 10,
    },
    nameLabel: {
        color: '#94A3B8',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: '700',
    },
    nameInput: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 14,
        paddingHorizontal: 18,
        paddingVertical: 14,
        fontSize: 18,
        color: '#fff',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    modeGrid: {
        gap: 16,
    },
    modeCard: {
        borderRadius: 26,
        padding: 24,
        borderWidth: 1,
        gap: 12,
    },
    hostCard: {
        backgroundColor: 'rgba(230,126,34,0.15)',
        borderColor: 'rgba(230,126,34,0.4)',
    },
    joinCard: {
        backgroundColor: 'rgba(52,152,219,0.15)',
        borderColor: 'rgba(52,152,219,0.4)',
    },
    disabledCard: {
        opacity: 0.4,
    },
    modeIcon: {
        fontSize: 40,
    },
    modeTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
    },
    modeDescription: {
        fontSize: 14,
        color: '#E2E8F0',
        lineHeight: 20,
    },
    modePill: {
        alignSelf: 'flex-start',
        borderRadius: 999,
        paddingVertical: 6,
        paddingHorizontal: 14,
    },
    hostPill: {
        backgroundColor: 'rgba(230,126,34,0.25)',
    },
    joinPill: {
        backgroundColor: 'rgba(52,152,219,0.25)',
    },
    modePillText: {
        fontSize: 13,
        fontWeight: '600',
    },
    hostPillText: {
        color: '#E67E22',
    },
    joinPillText: {
        color: '#3498DB',
    },
    tipCard: {
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        gap: 10,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    tipText: {
        fontSize: 14,
        color: '#CBD5F5',
        lineHeight: 22,
    },
});
